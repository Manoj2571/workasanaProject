

export default function getStatus (projectName, tasks) {


      const projectStatuses = tasks?.reduce((acc, curr) => {
        const currentStatus = acc[curr.project.name];
      
        if (!currentStatus) {
          acc[curr.project.name] = curr.status;
        } else if (curr.status === "Blocked" || currentStatus === "Blocked") {
          acc[curr.project.name] = "Blocked";
        } else if (currentStatus !== curr.status) {
          acc[curr.project.name] = "In Progress";
        }
      
        return acc;
      }, {});


      if(Object.keys(projectStatuses).includes(projectName)) {
        return projectStatuses[projectName]
      } else {
        return "To Do"
      }
    }