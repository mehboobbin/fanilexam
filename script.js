document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');
    const generateBtn = document.getElementById('generateBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // File upload functionality
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadBtn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', handleFileUpload);
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);

    function handleFileUpload(e) {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.style.borderColor = 'var(--primary)';
        uploadArea.style.backgroundColor = 'rgba(67, 97, 238, 0.05)';
    }

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        uploadArea.style.borderColor = 'var(--light-gray)';
        uploadArea.style.backgroundColor = '';
    }

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        handleDragLeave(e);
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    }

    function processFile(file) {
        if (!file) return;
        
        // Validate file type
        const validTypes = ['application/pdf', 'application/msword', 
                           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                           'application/vnd.ms-powerpoint', 
                           'application/vnd.openxmlformats-officedocument.presentationml.presentation'];
        
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid file type (PDF, DOC, DOCX, PPT, PPTX)');
            return;
        }
        
        // Update UI to show file is ready
        uploadArea.innerHTML = `
            <i class="fas fa-check-circle" style="color: var(--success); font-size: 3rem;"></i>
            <h3>${file.name}</h3>
            <p>Ready to generate exam paper</p>
            <button class="btn btn-primary" id="changeFileBtn">Change File</button>
        `;
        
        // Add event listener to the new button
        document.getElementById('changeFileBtn').addEventListener('click', () => {
            fileInput.value = '';
            resetUploadArea();
        });
    }

    function resetUploadArea() {
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Upload Your Syllabus</h3>
            <p>Drag & drop your syllabus file here or click to browse</p>
            <p class="file-types">Supported formats: PDF, DOCX, PPT</p>
            <button class="btn btn-primary" id="uploadBtn">Select File</button>
        `;
        
        // Reattach event listeners
        document.getElementById('uploadBtn').addEventListener('click', () => fileInput.click());
    }

    // Generate exam paper button
    generateBtn.addEventListener('click', function() {
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please upload a syllabus file first');
            return;
        }
        
        const examType = document.getElementById('exam-type').value;
        const duration = document.getElementById('duration').value;
        const difficulty = document.getElementById('difficulty').value;
        const totalMarks = document.getElementById('total-marks').value;
        
        // Get selected question types
        const questionTypes = [];
        if (document.getElementById('mcq').checked) questionTypes.push('MCQ');
        if (document.getElementById('short-answer').checked) questionTypes.push('Short Answer');
        if (document.getElementById('long-answer').checked) questionTypes.push('Long Answer');
        
        if (questionTypes.length === 0) {
            alert('Please select at least one question type');
            return;
        }
        
        // Show loading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        this.disabled = true;
        
        // Simulate generation process (in a real app, this would call an API)
        setTimeout(() => {
            alert(`Exam paper generated successfully!\n\nType: ${examType}\nDuration: ${duration} mins\nDifficulty: ${difficulty}\nTotal Marks: ${totalMarks}\nQuestion Types: ${questionTypes.join(', ')}`);
            
            // Reset button
            this.innerHTML = 'Generate Exam Paper <i class="fas fa-magic"></i>';
            this.disabled = false;
        }, 2000);
    });

    // Login/Signup buttons (placeholder functionality)
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Login functionality will be implemented in the next version');
    });

    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Signup functionality will be implemented in the next version');
    });
});