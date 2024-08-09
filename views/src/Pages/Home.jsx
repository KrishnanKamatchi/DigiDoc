import { useEffect, useState } from "react";
import Header from "../components/Header";
import { socket } from "../hooks/socket";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";
const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [doc, setDoc] = useState("");

  const onSubmit = () => {
    socket.emit("message", {
      name: "docuemntTest1",
      version: "0.0.1",
      content: doc,
    });
    enqueueSnackbar("Document saved successfully", { variant: "success" });
  };

  const handleUndoRedo = (type) => {
    if (type === "undo") {
      socket.emit("undo");
    } else {
      socket.emit("redo");
    }
  };

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        enqueueSnackbar(
          `Operation cancelled, Keyboard shortcut is premium feature`,
          {
            variant: "warning",
          }
        );
      }
    });

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="bg-black  ">
      <Header isConnected={isConnected} />
      <div className="bg-transparent pt-52 pb-10 ">
        <div className="mx-auto w-1/2 m-2 gap-1 flex">
          <button className="btn btn-warning font-semibold" onClick={onSubmit}>
            Save [Ctrl+S]
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleUndoRedo("undo")}
          >
            Undo <FaUndo />
          </button>
          <button
            className="btn btn-warning"
            onClick={() => handleUndoRedo("redo")}
          >
            Redo <FaRedo />
          </button>
          {/* <button className="btn btn-warning">Send</button> */}
        </div>

        <div className="bg-slate-100 w-1/2 h-screen mx-auto text-center rounded-md flex ">
          <textarea
            onChange={(e) => setDoc(e.target.value)}
            className="textarea textarea-warning w-full h-full"
            placeholder="Type Here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
