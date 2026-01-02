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
        Abishek: {
            name: "Abishek Bhatt",
            role: "Senior Video Graphy",
            bio: "Abishek focuses on creating content (like youtube , facebook ,tiktok and instagram) ,.",
            details: "With 5 years of experience in video editing and content creation, Abishek has produced engaging content for various platforms. He specializes in thumbnail creation and speaking.",
            skills: ["Video editing", "Thumbnail creation", "Speaking", "Content creation", "Social media management"],
            experience: "2+ years",
            education: "B.S. Interaction Design, Carnegie Mellon",
            achievements: [
                "Designed a component library used by 100,000+ daily active users",
                "Improved Lighthouse scores from 65 to 95+ across client projects",
                "Speaker at multiple web development conferences"
            ]
        },
        Sujal: {
            name: "Sujal Pant",
            role: "Senior Video Graphy",
            bio: "Sujal focuses on creating content (like youtube , facebook ,tiktok and instagram) ,.",
            details: "With 5 years of experience in video editing and content creation, Sujal has produced engaging content for various platforms. He specializes in thumbnail creation and speaking.",
            skills: ["Video editing", "Thumbnail creation", "Speaking", "Content creation", "Social media management"],
            experience: "2+ years",
            education: "B.S. Interaction Design, Carnegie Mellon",
            achievements: [
                "Designed a component library used by 100,000+ daily active users",
                "Improved Lighthouse scores from 65 to 95+ across client projects",
                "Speaker at multiple web development conferences"
            ]
        },
        rijan: {
            name: "Rijan Shakya",
            role: "Junior Web Developer",           
            bio: "Rijan is a junior web developer with a passion for building responsive and user-friendly websites. He has experience in both frontend and backend development.",
            details: "Rijan has worked on several projects using HTML, CSS, JavaScript, and popular frameworks. He is eager to learn and grow in the web development field.",
            skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"],    
            experience: "1+ years",
            education: "B.Sc. in Computer Science, Kathmandu University",
            achievements: [ 
                "Contributed to open-source web development projects",
                "Built a personal portfolio website showcasing projects",
                "Completed web development bootcamps and certifications"
            ]
        },
        Sushil: {
    name: "Sushil Ghimire",
    role: "Frontend Developer",
    bio: "Frontend developer focused on building modern, responsive, and visually engaging web interfaces using React and Tailwind CSS, with strong attention to UI/UX and performance.",
    details: "Sushil specializes in creating clean, scalable frontend architectures and polished user experiences. He emphasizes modern design systems, smooth animations, and accessibility while working closely with backend APIs.",
    skills: [
        "JavaScript (ES6+)",
        "React",
        "Tailwind CSS",
        "UI/UX Design",
        "Modern Animations",
        "MongoDB (Basics)",
        "REST APIs",
        "Responsive Design"
    ],
    experience: "Frontend-focused project experience",
    education: "Bachelor’s Degree in Computer Engineering",
    achievements: [
        "Built modern, responsive web interfaces using React and Tailwind CSS",
        "Designed user-friendly UI/UX layouts with accessibility in mind",
        "Implemented smooth UI animations for enhanced user experience",
        "Collaborated on full-stack projects integrating frontend with MongoDB-backed APIs"
    ]
},


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