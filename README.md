# Kapitänshaus Blankenese

Vollständige statische Demo-Website auf Deutsch. Keine Frameworks, keine externen Schriftarten, keine Laufzeit-Abhängigkeiten.

## Lokal ansehen

Im Projektverzeichnis `node server.cjs` starten und http://127.0.0.1:4173 öffnen. Der Server unterstützt Video-Range-Requests. Alternativ einen beliebigen statischen Webserver verwenden. Die Website-Dateien liegen im äußeren Projektverzeichnis; die vorhandenen Medien bleiben im Unterverzeichnis `Klaus-Blankenese-Website`.

## Dateien und Veröffentlichung

- `index.html`: sämtliche Inhalte, SEO-Metadaten, Formular und zugängliche Galerie.
- `styles.css`: responsive Gestaltung, Navigation, Medienkompositionen und reduzierte Bewegung.
- `script.js`: Navigation, bedarfsgesteuerte Videos, Galerie und lokale Anfragevorschau.
- `server.cjs`: optionaler lokaler Vorschau-Server, Node.js ohne Zusatzpakete.
- `posters/`: aus den Originalvideos abgeleitete Standbilder für Schlafzimmer und Garten.
- `Klaus-Blankenese-Website/`: unveränderte Originalbilder, Videos und README.txt.
- `quality/`: Browser-Prüfskript und visuelle Prüfbilder; nicht zur Veröffentlichung erforderlich.

Für statisches Hosting `index.html`, `styles.css`, `script.js`, `posters/` sowie die Originalordner `images/` und `videos/` unter ihrem bestehenden Pfad hochladen. Nach Auswahl einer echten Domain sollte `og:image` als absolute URL ergänzt werden. Es gibt keine erfundene Domain, keine Preise, Bewertungen oder strukturierten Buchungsdaten.

## Seitenaufbau

Video-Hero → Einführung und Eckdaten → Ausstattung → Küche → Schlafzimmer → Essen → Gartenblick → Badezimmer → WLAN und Arbeitsplatz → Blankenese und Elbe → Galerie mit acht Fotos → praktische Informationen → Anfragevorschau → Footer.

## Anfrage

Das Formular validiert Pflichtfelder und E-Mail, erzeugt eine lokale Vorschau und bietet einen Textdownload an. Es versendet nichts, speichert keine Formulardaten auf einem Server und hat keinen Kontakt-Endpunkt. Vor einem echten öffentlichen Betrieb müssen ein bestätigter Kontaktweg und die erforderlichen rechtlichen Inhalte vom Betreiber bereitgestellt werden.

## Medienprüfung

Alle acht Bildpfade und sieben Videopfade wurden geprüft. Alle Videos sind im Querformat:

| Video | Abmessungen | Dauer |
| --- | --- | --- |
| 01-hero-living-room.mov | 910 × 512 | 10 s |
| 02-bedroom.mov | 910 × 512 | 10 s |
| 03-kitchen.mp4 | 1921 × 1080 | 12 s |
| 04-dining.mp4 | 1920 × 1080 | 10 s |
| 05-garden.mp4 | 1920 × 1080 | 10 s |
| 06-bathroom.mp4 | 1920 × 1080 | 10 s |
| 07-elbe-location.mp4 | 1920 × 1080 | 10 s |

Fotos: Badewanne, Waschbecken/WC, Küche und Essbereich 720 × 480; Elbe 720 × 540; Wohnraum 720 × 622; Sofa und Elbhang 720 × 960.

Die Original-MOV-Dateien werden in Chrome erfolgreich wiedergegeben. Eine Wiedergabe in Safari und Firefox wurde hier nicht getestet; MOV-Unterstützung hängt vom Browser und Codec ab. Es war keine Konvertierung erforderlich. Der Hero hat ein Foto als Poster/Fallback. Originalmedien wurden weder ersetzt noch verändert. Einige Videos enthalten bereits sichtbare Aufnahme-/Listing-Texte und Ränder; diese stammen aus den gelieferten Dateien. Für eine spätere Veröffentlichung bieten sich saubere Originalaufnahmen an.

Geprüft in Chrome bei 1440 × 1000 und 390 × 844: alle Medien geladen, Anker gültig, Menü geöffnet/geschlossen, Lightbox vor/zurück/Escape, lokale Anfragevorschau, kein horizontaler Überlauf, keine JavaScript-Fehler, pausierte Videos bei reduzierter Bewegung. Die Galerie nutzt ein natives modales Dialogelement mit Fokusbindung, Tastaturnavigation und Wischgesten. Videos außerhalb des sichtbaren Bereichs werden pausiert; Innenraumvideos werden erst in der Nähe geladen.

Das optionale Prüfsystem benötigt Playwright und einen lokal installierten Chrome-Browser. Die Website selbst benötigt diese Werkzeuge nicht.
