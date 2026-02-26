document.addEventListener("DOMContentLoaded", () => {
    const username = "Vojtech-M";
    const container = document.getElementById("repo-container");

    async function getRepos() {
        try {
            const response = await fetch(
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
            );

            if (!response.ok)
                throw new Error("User not found or API limit reached");

            const repos = await response.json();
            container.innerHTML = "";

            repos.forEach((repo) => {
                if (repo.fork || repo.private || repo.archived) return;
                if (repo.name.toLowerCase().includes("code-sipplet")) return;

                const card = document.createElement("a");
                card.href = repo.html_url;
                card.target = "_blank";
                card.className = "repo-card";

                const description =
                    repo.description || "No description available.";
                const language = repo.language || "Code";

                card.innerHTML = `
                    <div class="repo-name">${repo.name}</div>
                    <div class="repo-desc">${description}</div>
                    <div class="repo-stats">
                        <span>● ${language}</span>
                        <span>★ ${repo.stargazers_count}</span>
                    </div>
                `;

                container.appendChild(card);
            });
        } catch (error) {
            console.error(error);
            container.innerHTML = `
                <p style="color:red; text-align:center;">
                    Error loading projects: ${error.message}
                </p>
            `;
        }
    }

    getRepos();
});