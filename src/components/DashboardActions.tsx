
import { useState } from "react";

import Button from "./Button";
import ProjectInfoDialog from "./ProjectInfoDialog";

function DashboardActions() {
    const [isInfoOpen, setIsInfoOpen] =
        useState(false);

    function openProjectInfo() {
        setIsInfoOpen(true);
    }

    function closeProjectInfo() {
        setIsInfoOpen(false);
    }

    return (
        <>
            <Button onClick={openProjectInfo}>
                View Project Info
            </Button>

            <Button disabled>
                Export Report
            </Button>

            <ProjectInfoDialog
                isOpen={isInfoOpen}
                onClose={closeProjectInfo}
            />
        </>
    );
}

export default DashboardActions;
