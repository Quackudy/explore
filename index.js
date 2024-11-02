let i = 3;

function toggleColors(selectedPage) {
    const captchaItem = document.querySelector('.nav-item.left');
    const contactItem = document.querySelector('.nav-item.right');
    const contentDiv = document.getElementsByClassName('contacts-library')[0];

    // Clear selected class from both items
    captchaItem.classList.remove('selected');
    contactItem.classList.remove('selected');

    // Set the selected item and update content
    if (selectedPage === 'captcha') {
        captchaItem.classList.add('selected');
        contentDiv.innerHTML = `
			<ul class="contacts-list">
				
				<a href="contact-profile.html">
					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">อาจารย์เบียร์</p>
							<p class="relationship">เพื่อน</p>
						</li>

						<li class="list__item">
							<i class="fas fa-phone"></i>
						</li>
					</div>
				</a>

				<hr>

				<a href="contact-profile.html">
					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">คนตื่นธรรม</p>
							<p class="relationship">เพื่อน</p>
						</li>

						<li class="list__item">
							<i class="fas fa-phone"></i>

						</li>
					</div>
				</a>

				<hr>

				<a href="contact-profile.html">
					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">เจน</p>
							<p class="relationship">ไม่ชัดเจน</p>
						</li>

						<li class="list__item">
							<i class="fas fa-phone"></i>
						</li>
					</div>
				</a>

				<hr>

				<a href="contact-profile.html">
					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">นุ่น</p>
							<p class="relationship">รุ่นน้อง</p>
						</li>
						<li class="list__item">
							<i class="fas fa-phone"></i>
						</li>
					</div>
				</a>

				<hr>

				<a href="contact-profile.html">
					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">โบว์</p>
							<p class="relationship">ป้าขายไก่ทอด</p>
						</li>
						<li class="list__item">
							<i class="fas fa-phone"></i>
						</li>
					</div>
				</a>
				<hr>
			</ul>
        `;
    } else if (selectedPage === 'contact') {
        contactItem.classList.add('selected');
		i = 3
        contentDiv.innerHTML = `
			<ul class="contacts-list">

					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">Captcha 1</p>
							<input type="text" class="pin" value="654213"></p>
						</li>

					</div>
			
				<hr>

					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">Captcha 2</p>
							<input type="text" class="pin" value="157892"></p>
						</li>

					</div>
				<hr>

					<div class="contact-section">
						<li class="list__item">
							<p class="contact-name">Captcha 3</p>
							<input type="text" class="pin" value="135598426"></p>
						</li>

					</div>
	

				<hr>

						
				<div class="input-group">
					<input placeholder="ใส่รหัส" type="text" id="input-field">
					<button class="submit-button" onclick="addPin(document.getElementById('input-field').value)"><span>เพิ่ม</span></button>
				</div>

			</ul>
        `;
    }
}

 // Initialize i outside the function

function addPin(val) {
    const contentDiv = document.getElementsByClassName('contacts-library')[0];
    
    // Increment i for each new captcha added
    i += 1;

    // Create the new HTML content
    const newContent = `
        <div class="contact-section">
            <li class="list__item">
                <p class="contact-name">Captcha ${i}</p>
                <input type="text" class="pin" value="${val}">
            </li>
        </div>
        <hr>
    `;
    
    // Append the new content to the existing inner HTML
    contentDiv.innerHTML += newContent;
}



	


const pulse = document.getElementById('pulse');
let position = 0; // Initial position

// Event listeners for touch events
pulse.addEventListener('touchstart', handleTouchStart, false);
pulse.addEventListener('touchmove', handleTouchMove, false);
pulse.addEventListener('touchend', handleTouchEnd, false);

// Event listeners for mouse events
pulse.addEventListener('mousedown', handleMouseDown, false);
pulse.addEventListener('mousemove', handleMouseMove, false);
pulse.addEventListener('mouseup', handleMouseUp, false);
pulse.addEventListener('mouseleave', handleMouseLeave, false);

let xStart = null;
let isDragging = false;

function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xStart = firstTouch.clientX; // Get the starting position
    isDragging = true;
}

function handleTouchMove(evt) {
    if (!isDragging) return; // Return if not dragging

    let xMove = evt.touches[0].clientX; // Current position
    let xDiff = xStart - xMove; // Calculate difference
    movePulse(xDiff);
}

function handleTouchEnd() {
    isDragging = false; // Reset dragging state
    checkSlide(); // Check the slide direction and act accordingly
}

function handleMouseDown(evt) {
    xStart = evt.clientX; // Get the starting position
    isDragging = true;
}

function handleMouseMove(evt) {
    if (!isDragging) return; // Return if not dragging

    let xMove = evt.clientX; // Current position
    let xDiff = xStart - xMove; // Calculate difference
    movePulse(xDiff);
}

function handleMouseUp() {
    isDragging = false; // Reset dragging state
    checkSlide(); // Check the slide direction and act accordingly
}

function handleMouseLeave() {
    isDragging = false; // Reset dragging state when leaving
    checkSlide(); // Check the slide direction and act accordingly
}

function movePulse(xDiff) {
    position += xDiff; // Update position
    // Limit the position to prevent moving too far left or right
    position = Math.max(-50, Math.min(position, 50)); // Example limits of -50 to 50 pixels
    pulse.style.transform = `translateX(${-position}px)`; // Apply movement

    // Change color based on direction, with slight variation
    if (position > 0) {
        // Move left, make it slightly red
        pulse.style.backgroundColor = `rgba(255, 100, 165, ${Math.abs(position) / 50})`; // Adjust opacity based on position
    } else if (position < 0) {
        // Move right, make it slightly green
        pulse.style.backgroundColor = `rgba(185, 255, 180, ${Math.abs(position) / 50})`; // Adjust opacity based on position
    } else {
        // Reset to default color
        pulse.style.backgroundColor = 'rgba(212, 179, 255)'; // Default color
    }
}


function checkSlide() {
    if (position < -25) { // Slide left threshold
        setTimeout(() => {
            window.location.href = 'called.html'; // Navigate after 1 second
        }, 500);
    } else if (position > 25) { // Slide right threshold
        setTimeout(() => {
            window.location.href = 'index.html'; // Navigate after 1 second
        }, 500);
    } else {
        resetPulse(); // Reset if not far enough left or right
    }
}

function resetPulse() {
    // Reset the position and color
    position = 0; // Reset position
    pulse.style.transform = `translateX(${position}px)`; // Apply reset position
    pulse.style.backgroundColor = 'rgba(212, 179, 255)'; // Reset to default color
}




