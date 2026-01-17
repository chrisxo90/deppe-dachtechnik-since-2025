<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "dachtechnikdeppe@gmail.com";
    $subject = "Kontaktanfrage von " . strip_tags($_POST["name"]);
    $message = "Name: " . strip_tags($_POST["name"]) . "\n";
    $message .= "E-Mail: " . strip_tags($_POST["email"]) . "\n\n";
    $message .= "Nachricht:\n" . strip_tags($_POST["message"]);
    $headers = "From: " . strip_tags($_POST["email"]);

    if (mail($to, $subject, $message, $headers)) {
        echo "Vielen Dank für Ihre Nachricht!";
    } else {
        echo "Fehler beim Senden.";
    }
}
?>