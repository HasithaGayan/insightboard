
import { useEffect, useRef } from "react";
import Button from "./Button";
import "./ProjectInfoDialog.css";

interface ProjectInfoDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

function ProjectInfoDialog({
    isOpen,
    onClose,
}: ProjectInfoDialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog || !isOpen) {
            return;
        }

        dialog.showModal();

        return () => {
            dialog.close();
        };
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            className="project-dialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <h2 id="dialog-title">
                About InsightBoard
            </h2>

            <p id="dialog-description">
                A professional business analytics
                dashboard built using React and TypeScript.
            </p>

            <div className="dialog-details">
                <h3>Development Status</h3>

                <p>In Development</p>

                <p>
                    This dashboard currently displays
                    demonstration data.
                </p>
            </div>

            <Button onClick={onClose}>
                Close
            </Button>
        </dialog>
    );
}

export default ProjectInfoDialog;
