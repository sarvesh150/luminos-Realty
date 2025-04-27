async function submitLead(event, id) {
    event.preventDefault();
    const form = document.getElementById(`form-${id}`);
    const data = {
        name: form.querySelector('input[name="name"]').value,
        phone: form.querySelector('input[name="phone"]').value,
        email: form.querySelector('input[name="email"]').value,
        budget: form.querySelector('input[name="budget"]').value,
        possession: form.querySelector('input[name="possession"]').value,
        projectId: id
    };
    try {
        const response = await fetch('/.netlify/functions/submit-lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        alert('Thank you for your enquiry with Luminos Realty! Our team will contact you soon to discuss your luxury home needs.');
        form.style.display = 'none';
    } catch (error) {
        alert('Oops! Something went wrong. Please try submitting again or contact us at info@luminosrealty.com.');
    }
}