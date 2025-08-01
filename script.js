$(document).ready(function() {

    $('#phone').on('keydown', function(event) {
        const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'
        ];
        if (allowedKeys.includes(event.key)) {
            return; 
        }

        if (!/^\d$/.test(event.key) || this.value.length >= 10) {
            event.preventDefault();
        }
    });

    // --- FORM SUBMISSION ---
    $('#validation-form').on('submit', function(event) {
        event.preventDefault(); 
        $('.error-message').hide();
        $('.success-message').hide();

        let isValid = true;

        // --- Username Validation ---
        const username = $('#username').val().trim();
        if (username === '') {
            isValid = false;
            $('#username').next('.error-message').text('Username is required.').show();
        }

        // --- Email Validation ---
        const email = $('#email').val().trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email === '') {
            isValid = false;
            $('#email').next('.error-message').text('Email is required.').show();
        } else if (!emailPattern.test(email)) {
            isValid = false;
            $('#email').next('.error-message').text('Please enter a valid email address.').show();
        }
        
        // --- Phone Validation ---
        const phone = $('#phone').val().trim();
        const phonePattern = /^\d{10}$/;
        if (phone === '') {
            isValid = false;
            $('#phone').siblings('.error-message').text('Phone number is required.').show();
        } else if (!phonePattern.test(phone)) {
            isValid = false;
            $('#phone').siblings('.error-message').text('Phone number must be exactly 10 digits.').show();
        }

        // --- Password Validation ---
        const password = $('#password').val();
        if (password === '') {
            isValid = false;
            $('#password').closest('.form-group').find('.error-message').text('Password is required.').show();
        } else if (password.length < 8) {
            isValid = false;
            $('#password').closest('.form-group').find('.error-message').text('Password must be at least 8 characters long.').show();
        } else if (!/(?=.*[a-z])/.test(password)) {
            isValid = false;
            $('#password').closest('.form-group').find('.error-message').text('Password must contain at least one lowercase letter.').show();
        } else if (!/(?=.*[A-Z])/.test(password)) {
            isValid = false;
            $('#password').closest('.form-group').find('.error-message').text('Password must contain at least one uppercase letter.').show();
        } else if (!/(?=.*\d)/.test(password)) {
            isValid = false;
            $('#password').closest('.form-group').find('.error-message').text('Password must contain at least one number.').show();
        }

        // --- Confirm Password Validation ---
        const confirmPassword = $('#confirm-password').val();
        if (confirmPassword === '') {
            isValid = false;
            $('#confirm-password').closest('.form-group').find('.error-message').text('Please confirm your password.').show();
        } else if (password !== confirmPassword) {
            isValid = false;
            $('#confirm-password').closest('.form-group').find('.error-message').text('Passwords do not match.').show();
        }

        // --- Show Success Message ---
        if (isValid) {
            $('.success-message').text('Registration successful!').show();
            $('#validation-form')[0].reset();
        }
    });

    // --- PASSWORD TOGGLE ---
    $('.toggle-password').click(function () {
        const targetId = $(this).data('target');
        const inputField = $('#' + targetId);
        const currentType = inputField.attr('type');

        if (currentType === 'password') {
            inputField.attr('type', 'text');
            $(this).text('Hide');
        } else {
            inputField.attr('type', 'password');
            $(this).text('Show');
        }
    });

});
