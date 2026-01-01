// Team Member Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('memberModal');
    const closeModal = document.getElementById('closeModal');
    const viewDetailsBtns = document.querySelectorAll('.view-details');
    const modalName = document.getElementById('modalName');
    const modalBody = document.getElementById('modalBody');

    // Only initialize if modal exists (team page)
    if (!modal) return;

    // Team member data
    const teamMembers = {
        saroj: {
            name: "Saroj Singh Dhami",
            role: "Lead Full-Stack Developer",
            bio: "Saroj leads our full-stack development initiatives with 3+ years of experience building modern web applications. He specializes in AI, ML, and scalable cloud-native architectures.",
            details: "Saroj has extensive experience with Python, FastAPI, and AWS. He is passionate about building intelligent systems and optimizing backend performance.",
            skills: ["C", "C++", "DSA", "Python", "FastAPI", "AI/ML", "AWS", "PostgreSQL", "Docker", "Kubernetes"],
            experience: "3+ years",
            education: "Computer Engineering from Tribhuvan University(TU) ,collage advance collage of engineering",
            achievements: [
                "Developed scalable backend for AI-driven platforms",
                "Implemented complex cloud architectures on AWS and Render",
                "Specialized in PostgreSQL database optimization"
            ],
            projects: [
                "https://school-management-system-o42d.onrender.com",
                "https://abroadkhabar.com/"
            ]

        },
        rijan: {
            name: "Rijan Ghimire",
            role: "Frontend Developer",
            bio: "Rijan focuses on creating responsive, accessible user interfaces with modern JavaScript frameworks. He has a keen eye for design and user experience.",
            details: "With 2 years of frontend development experience, Rijan has built academic and personal frontend projects focusing on clean UI and interactivity.",
            skills: ["React", "CSS/SCSS", "Java Script", "UI/UX", "Responsive Design"],
            experience: "2+ years",
            education: "Computer Engineering from Tribhuvan University(TU) ,Advance College of Engineering",
            achievements: [
                "Developed 5+ responsive web applications",
                "Have worked on real-world scenarios",
                "Experience using Git and GitHub"
            ]
        },
        michael: {
            name: "Michael Chen",
            role: "Mobile App Developer",
            bio: "Specializes in cross-platform mobile applications using React Native and Flutter. Creates performant mobile experiences for iOS and Android.",
            details: "Michael has built mobile apps with over 1 million downloads across the App Store and Google Play Store. He focuses on creating smooth, native-like experiences.",
            skills: ["React Native", "Flutter", "iOS", "Android", "TypeScript", "Firebase"],
            experience: "6+ years",
            education: "B.S. Computer Science, University of Michigan",
            achievements: [
                "Built a health app with 500,000+ active users",
                "Reduced app size by 60% through optimization",
                "Achieved 4.8+ star ratings on app stores"
            ]
        },
        jessica: {
            name: "Jessica Williams",
            role: "Project Manager",
            bio: "Ensures projects are delivered on time, within budget, and exceed client expectations through effective communication and agile methodologies.",
            details: "Jessica has managed over 50 successful web projects ranging from small business websites to enterprise applications. She's certified in Scrum and Agile methodologies.",
            skills: ["Agile", "Scrum", "Jira", "Client Relations", "Budget Management", "Risk Assessment"],
            experience: "7+ years",
            education: "MBA, Kellogg School of Management",
            achievements: [
                "Maintained 100% on-time project delivery for 3 consecutive years",
                "Increased client satisfaction scores from 85% to 98%",
                "Reduced project overhead costs by 25%"
            ]
        },
        jane: {
            name: "Jane Doe",
            role: "HR Manager",
            bio: "Jane fosters a culture of innovation and excellence. She is dedicated to finding the best talent and ensuring a supportive work environment.",
            details: "With over 8 years in human resources, Jane has implemented several wellness and productivity programs that have significantly improved employee retention and satisfaction.",
            skills: ["Recruitment", "Employee Relations", "Talent Management", "Conflict Resolution", "HR Compliance"],
            experience: "8+ years",
            education: "B.A. Human Resources, Stanford",
            achievements: [
                "Reduced employee turnover rate by 15%",
                "Streamlined recruitment process, reducing time-to-hire by 20%",
                "Implemented a comprehensive mental health wellness program"
            ]
        }
    };

    // Open modal when clicking view details
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const memberId = this.getAttribute('data-member');
            const member = teamMembers[memberId];

            if (member) {
                modalName.textContent = member.name;

                // Create achievements list
                const achievementsList = member.achievements
                    ? member.achievements.map(achievement => `<li>${achievement}</li>`).join('')
                    : '';

                modalBody.innerHTML = `
                    <div class="modal-image">
                        <img src="${btn.closest('.team-member').querySelector('img').src}" alt="${member.name}">
                    </div>
                    <div class="modal-details">
                        <h3>${member.name}</h3>
                        <span class="modal-role">${member.role}</span>
                        
                        <div class="member-info-section">
                            <p><strong>Experience:</strong> ${member.experience}</p>
                            <p><strong>Education:</strong> ${member.education}</p>
                        </div>
                        
                        <div class="member-bio">
                            <h4>About</h4>
                            <p>${member.bio}</p>
                            <p>${member.details}</p>
                        </div>
                        
                        ${achievementsList ? `
                        <div class="member-achievements">
                            <h4>Key Achievements</h4>
                            <ul>${achievementsList}</ul>
                        </div>
                        ` : ''}
                        
                        <div class="member-skills-section">
                            <h4>Skills & Technologies</h4>
                            <div class="member-skills" style="margin-top: 1rem;">
                                ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-actions" style="margin-top: 2rem;">
                            <a href="contact.html?subject=Work+with+${encodeURIComponent(member.name)}" class="btn btn-primary">
                                <i class="fas fa-envelope"></i> Contact ${member.name.split(' ')[0]}
                            </a>
                        </div>
                    </div>
                `;

                // Show modal with animation
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';

                // Animate modal appearance with GSAP
                if (typeof gsap !== 'undefined') {
                    // Use fromTo to ensure animation starts from 0 opacity every time
                    gsap.fromTo('.modal-content',
                        { y: 50, opacity: 0 },
                        {
                            duration: 0.5,
                            y: 0,
                            opacity: 1,
                            ease: 'power3.out',
                            clearProps: 'transform' // Optional but clean
                        }
                    );
                }
            } else {
                console.warn(`No data found for team member ID: ${memberId}`);
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', closeModalAnimation);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModalAnimation();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModalAnimation();
        }
    });

    // Close modal function with animation
    function closeModalAnimation() {
        if (typeof gsap !== 'undefined') {
            gsap.to('.modal-content', {
                duration: 0.3,
                y: 50,
                opacity: 0,
                ease: 'power3.in',
                onComplete: () => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Add modal styles dynamically
    const modalStyles = `
        .member-info-section {
            background: rgba(99, 102, 241, 0.05);
            padding: 1rem;
            border-radius: var(--radius-sm);
            margin: 1.5rem 0;
            border: var(--border-glass);
        }
        
        .member-bio h4,
        .member-achievements h4,
        .member-skills-section h4 {
            color: var(--color-primary);
            margin: 1.5rem 0 1rem;
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .member-achievements ul {
            list-style: none;
            padding-left: 1rem;
        }
        
        .member-achievements li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.8rem;
            color: var(--text-muted);
        }
        
        .member-achievements li:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--color-secondary);
            font-weight: bold;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
});