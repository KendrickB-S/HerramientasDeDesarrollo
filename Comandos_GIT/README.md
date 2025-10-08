# metodo utilizado 
___
Gitflow
es un modelo de ramificación de Git que proporciona una estrategia estructurada y organizada para el desarrollo de software, utilizando un conjunto de ramas predefinidas para gestionar características, lanzamientos (releases) y correcciones urgentes (hotfixes).
___
## comandos GIT utilizados

para crear una nueva rama se utiliza el comando:

### git branch nueva_rama
nos sirve para crear una nueva rama
___

### git checkout nueva_rama
nos sirve para cambiar a la rama creada

___

### git commi -m "mensaje"
Git necesita conocer el historial de cambios y mostrar a todos los codificadores quién hizo qué en cada momento. "commit" es como registrar los cambios en la memoria del proyecto.

___

### git push origin nueva_rama
sirve para subir la rama local llamada nueva_rama a un repositorio remoto

___

### Otras estrategias de branching además de Gitflow incluyen:

GitLab Flow y el desarrollo basado en troncos, cada uno adaptado a diferentes necesidades, desde la entrega continua hasta el control de versiones más robusto. 

### GitLab Flow
* Estructura más compleja: Combina el desarrollo basado en características con la integración de varias versiones.
* Ramas de entorno y versión: Introduce ramas de entorno para desplegar en diferentes ambientes y ramas de versiones para el control de las versiones finales.
* Flexibilidad: Ofrece un enfoque más estructurado que GitHub Flow, siendo una buena opción si se necesita más adaptabilidad. 
___

### Desarrollo basado en troncos (Trunk-Based Development) 
* Historia lineal: Se caracteriza por una única rama principal (el "trunk" o tronco) donde se integran los cambios continuamente.
* Integración continua: Los desarrolladores crean ramas de características de corta duración que se fusionan frecuentemente, promoviendo la colaboración constante.
* Estabilidad: Requiere que la rama principal esté siempre estable y lista para producción, lo que facilita la automatización de despliegues. 
Otras alternativas
OneFlow: Una propuesta que busca simplificar la duplicidad entre las ramas master y develop.

___

### Cactus Model
Mantiene las ramas de release separadas de la rama principal, buscando una historia lineal mediante rebases constantes.
* Estrategia de tres ramas (Dev/Staging/Prod):
Utiliza un enfoque más lineal con ramas dedicadas para desarrollo (dev), pre-producción (staging) y producción (prod), alineándose con la entrega continua. 
