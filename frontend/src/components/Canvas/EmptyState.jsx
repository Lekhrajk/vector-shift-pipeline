import { motion } from 'framer-motion';
import { Workflow, Plus, BrainCircuit, FileJson, Sparkles } from 'lucide-react';

export const EmptyState = () => {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_50%)]" />

            {/* Animated Floating Nodes in Background */}
            <div className="absolute inset-0 opacity-[0.2]">
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3], rotate: [0, 5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-[25%] text-indigo-400"
                >
                    <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
                        <BrainCircuit size={28} />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2], rotate: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[25%] right-[25%] text-purple-400"
                >
                    <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 shadow-xl">
                        <FileJson size={28} />
                    </div>
                </motion.div>

                <motion.div
                    animate={{ y: [0, -15, 0], opacity: [0.2, 0.4, 0.2], rotate: [0, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute top-[30%] right-[35%] text-emerald-400"
                >
                    <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 shadow-xl flex items-center justify-center font-bold text-lg w-12 h-12">
                        {"{ }"}
                    </div>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col items-center text-center z-10"
            >

                {/* Animated Icon Container */}
                <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                    {/* Pulsing outer ring */}
                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse" />

                    {/* Inner glowing container */}
                    <div className="relative w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-950 rounded-[1.5rem] flex items-center justify-center border border-gray-700/50 shadow-inner overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                        <Workflow className="w-10 h-10 text-indigo-400 relative z-10" strokeWidth={1.5} />

                        {/* Rotating sparkles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                            className="absolute -right-3 -top-3 w-10 h-10 flex items-center justify-center"
                        >
                            <Sparkles className="w-5 h-5 text-purple-400 opacity-60" />
                        </motion.div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-3xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent tracking-tight">
                        Start Building
                    </h3>
                </div>

                <p className="text-base text-gray-400 leading-relaxed max-w-md mb-8">
                    Drag and drop nodes from the top toolbar onto this canvas to construct your AI pipeline.
                </p>

                {/* Simulated 'Drop' Area Indicator */}
                <motion.div
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-400 bg-gray-950/50 px-5 py-2.5 rounded-full border border-gray-800/60 shadow-inner"
                >
                    <Plus size={14} className="text-indigo-400" />
                    <span className="tracking-wide uppercase">Drop nodes here</span>
                </motion.div>
            </motion.div>
        </div>
    );
};
