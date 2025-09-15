import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      className="flex justify-center items-center py-4"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="w-6 h-6 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </motion.div>
  );
}

export default Loader;
