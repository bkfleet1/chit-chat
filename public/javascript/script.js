var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    const timeout = async () => {
        const response = await fetch("/api/users/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      
        if (response.ok) {
          document.location.replace("/");
        } else {
          alert("Can not logout.");
        }
      };

    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(timeout, 300000)
        // 1000 milliseconds = 1 second
    }
};

window.onload = function() {
    inactivityTime();
  }