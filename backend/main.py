from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from collections import defaultdict, deque

app = FastAPI()

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def is_dag(nodes: List[Any], edges: List[Any]) -> bool:
    """
    Check if the graph is a DAG using Kahn's algorithm (BFS topological sort).
    Returns True if the graph is a DAG (no cycles), False otherwise.
    """
    # Build adjacency list and in-degree count
    node_ids = set()
    for node in nodes:
        node_id = node.get("id") if isinstance(node, dict) else str(node)
        node_ids.add(node_id)

    adj = defaultdict(list)
    in_degree = defaultdict(int)

    for node_id in node_ids:
        in_degree[node_id] = 0

    for edge in edges:
        if isinstance(edge, dict):
            source = edge.get("source", "")
            target = edge.get("target", "")
        else:
            continue

        adj[source].append(target)
        in_degree[target] += 1

    # Kahn's algorithm
    queue = deque([n for n in node_ids if in_degree[n] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If all nodes were visited, there's no cycle → it's a DAG
    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    # DAG Check
    dag = is_dag(pipeline.nodes, pipeline.edges)
    
    # Connectivity Check
    # A graph is considered connected for our purposes if every node has at least one edge.
    # Note: This is "weak" connectivity (any edge connection counts).
    if num_nodes == 0:
        connected = True
    elif num_nodes > 0 and num_edges == 0:
        connected = num_nodes == 1 # A single node is connected, >1 nodes with 0 edges are disconnected
    else:
        connected_nodes = set()
        for edge in pipeline.edges:
            if isinstance(edge, dict):
                connected_nodes.add(edge.get("source"))
                connected_nodes.add(edge.get("target"))
        
        # Check if all actual node IDs are present in the set of connected nodes
        node_ids = {node.get("id") if isinstance(node, dict) else str(node) for node in pipeline.nodes}
        connected = node_ids.issubset(connected_nodes)

    return {
        "num_nodes": num_nodes, 
        "num_edges": num_edges, 
        "is_dag": dag,
        "is_connected": connected
    }
