const showContributorButton = document.querySelector("#show-contributor");
const contributionStatus = document.querySelector("#contribution-status");
const contributorDetails = document.querySelector("#contributor-details");
const contributorName = document.querySelector("#contributor-name");
const contributorStudentId = document.querySelector("#contributor-student-id");

showContributorButton.addEventListener("click", async () => {
	showContributorButton.disabled = true;
	contributionStatus.textContent = "Loading contributor details...";
	contributionStatus.dataset.type = "info";
	contributorDetails.hidden = true;

	try {
		const response = await fetch("contribution.json");
		if (!response.ok) {
			throw new Error(`Could not load contributor details (${response.status}).`);
		}

		const contributor = await response.json();
		if (
			typeof contributor.studentName !== "string"
			|| typeof contributor.studentId !== "string"
		) {
			throw new Error("Contributor details are incomplete.");
		}

		contributorName.textContent = contributor.studentName;
		contributorStudentId.textContent = `Student ID: ${contributor.studentId}`;
		contributorDetails.hidden = false;
		contributionStatus.textContent = "";
	} catch (error) {
		contributionStatus.textContent = error instanceof Error
			? error.message
			: "Could not load contributor details. Please try again.";
		contributionStatus.dataset.type = "error";
	} finally {
		showContributorButton.disabled = false;
	}
});
