

  const username = 'Vojtech-M'; 
        // ▲▲▲ CHANGE THIS TO YOUR GITHUB USERNAME ▲▲▲

        const container = document.getElementById('repo-container');

        async function getRepos() {
            try {
                // Fetch repos sorted by latest update
                const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
                
                if (!response.ok) throw new Error('User not found or API limit reached');
                
                const repos = await response.json();

                // Clear container (just in case)
                container.innerHTML = '';

                repos.forEach(repo => {
                    // Create the main card link
                    if (repo.fork) return; // Skip forked repos
                    if (repo.private) return; // Skip private repos
                    if (repo.archived) return; // Skip archived repos

                    // Filter repost I don't want to show
                    if (repo.name.toLowerCase().includes('code-sipplet')) return; // Skip test repos



                    const card = document.createElement('a');
                    card.href = repo.html_url;
                    card.target = "_blank"; // Open in new tab
                    card.className = 'repo-card';

                    // Create the content HTML
                    // We check if description exists, otherwise show empty string
                    const description = repo.description ? repo.description : 'No description available.';
                    const language = repo.language ? repo.language : 'Code';

                    card.innerHTML = `
                        <div class="repo-name">${repo.name}</div>
                        <div class="repo-desc">${description}</div>
                        <div class="repo-stats">
                            <span>● ${language}</span>
                            <span>★ ${repo.stargazers_count}</span>
                        </div>
                    `;

                    // Append to the container
                    container.appendChild(card);
                });

            } catch (error) {
                console.error(error);
                container.innerHTML = `<p style="color:red; text-align:center;">Error loading projects: ${error.message}</p>`;
            }
        }

        // Run the function
        getRepos();