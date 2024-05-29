document.getElementById("contact-us-form-js").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()));

    fetch("/registry", {
        method: "POST",
        body: formDataJSON,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status == 200) {
                return response.text();
            } else {
                return new Promise((resolve, reject) => {
                    response.text().then((responseText) => {
                        reject(responseText);
                    });
                })
            }
        })
        .then(onPostNext)
        .catch(onPostError);
});

onPostError = (error) => {
    const $notification = document.getElementById("notification");
    $notification.classList.add('error');
    $notification.classList.add('active');
    const $message = $notification.querySelector('#message');
    $message.innerText = error;

    setTimeout(() => {
        $notification.classList.remove('active');
        setTimeout(() => {
            $notification.classList.remove('error');
        }, 500);
    }, 5000);
    
}

onPostNext = (reponse) => {
    const $notification = document.getElementById("notification");
    $notification.classList.add('next');
    $notification.classList.add('active');
    const $message = $notification.querySelector('#message');
    $message.innerText = reponse;
    setTimeout(() => {
        $notification.classList.remove('active');
        setTimeout(() => {
            $notification.classList.remove('next');
        }, 500);
    }, 5000);
    document.getElementById("contact-us-form-js").reset();
}