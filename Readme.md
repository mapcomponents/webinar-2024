# MapComponents + Vite + React

This is a [MapComponents](https://mapcomponents.org) project using Vite and React.

## MapComponents
MapComponents ist ein clientseitiges React Framework zur deklarativen Erstellung interaktiver Kartenanwendungen mithilfe von selbstorganisierenden, isolierten Komponenten. Anwendungen werden aus wiederverwertbaren, modularen Komponenten zusammengestellt, die in ihrer Kombination komplexere Funktionalitäten bereitstellen, dabei jedoch möglichst wenig voneinander wissen.

Das Framework verfolgt einen deklarativen Ansatz, bei dem der Entwickler den gewünschten Zielzustand der Anwendung beschreibt und die Benutzeroberfläche automatisch diesem Zustand entsprechend angepasst wird. Dieser Ansatz ermöglicht eine intuitive und weniger Fehleranfällige Entwicklung von komplexen Anwendungen.

An zentraler Stelle befindet sich der MapContext, über den Karten Instanzen registriert und abgerufen werden können. Das MapLibreMap Component hat die Aufgabe, eine neue MapLibre-gl Instanz zu initialisieren und diese im MapContext zu registrieren, damit andere MapComponents damit interagieren können, sowie dessen Canvas HTML Element zu erzeugen, auf welchem die Kartendarstellung auf der Webseite erfolgt.

Die Komponenten sind voneinander isoliert, interagieren also nicht direkt miteinander. Jede Komponente hat eine bestimmte Aufgabe, für die sie verantwortlich ist. In der Regel handelt es sich dabei um die Manipulation oder Überwachung einer MapLibre-gl Instanz. z.B. Das Hinzufügen einer “Source” und eines “Layers” auf einer Karte. Sobald die Karten-Instanz initialisiert ist, erhält die Komponente ein Signal und stellt die Ressourcen, für die sie konfiguriert ist, in der Karten-Instanz her. Wird die Karten-Instanz entfernt, erhält die Komponente ein Signal, dass die Karte nicht mehr vorhanden ist, um ggf. eigene UI-Elemente entsprechend anzupassen. Sobald die Karten-Instanz wieder vorhanden ist, wird die Komponente wieder den konfigurierten Zustand herstellen. Diese Isolation reduziert allgemein die Fehleranfälligkeit und ermöglicht besser wartbare und skalierbare Anwendungen.

## Über dieses Repository
Dieses Repository enthält sowohl den Code als auch eine Erklärung der Schritte zur Erstellung einer MapComponents-Beispielanwendung. In jedem der Verzeichnisse enthält die Datei Readme.md die ausführliche Beschreibung und der Code entspricht dem Zustand der Anwendung, nachdem der jeweilige Schritt abgeschlossen ist.
Alle Datendateien, die als Quellen für die Anwendung verwendet werden, befinden sich in den in der Beschreibung angegebenen Ordnern. 
Jeder Ordner enthält eine von den anderen unabhängige Anwendung, die im Entwicklungsmodus ausgeführt werden kann, indem Sie die folgenden Befehle im Terminal ausführen: 
1. `cd Step<number>`
2. `yarn`
3. `yarn dev`

## Step 0
Bevor wir beginnen, erstellen wir eine MapComponents-Anwendung unter Verwendung der Vorlage [MapComponents + vite + react + typescript](https://github.com/mapcomponents/template). 
Wir öffnen ein Terminal in dem Ordner, in dem wir arbeiten wollen, und führen die folgenden Befehle aus: 
1. `npx degit mapcomponents/template {your-app-name}`
2. `cd {your-app-name}`
3. `yarn`
4. `yarn dev`

[Zu Step1](https://github.com/mapcomponents/webinar-2024/tree/main/Step1#step-1)

