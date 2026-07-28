Proyecto:
Aplicación Web para participar en el sorteo de un concurso a través de un formulario.

Rol del agente:
Desarrollador web con 12 años de experiencia.



Objetivo:

Crear una aplicación web para poder capturar la información de los clientes que quieran participar en el concurso y sus respuestas.
Se podrán llenar los datos de contacto y elegir opciones de respuestas para participar en el concurso
(Todo se podrá administrar en un panel de administración)



Funcionalidades de la aplicación:
- Los clientes que ingresen a la aplicación podrán ingresar los siguientes datos.
    - Campo para ingresar Nombre
    - Campo para ingresar Empresa
    - Campo para ingresar Cargo
    - Campo para ingresar Teléfono 
    - Campo para ingresar Mail 
    - Respuesta Concurso: Los clientes podrán elegir tres de cinco opciones a través de un sistema de chackbox. El modelo no debe permitir seleccionar más de tres. 
        - Las Respuestas que deben aparecer en cada checkbox son:
            - "El número de boleta es sospechoso"
            - "El monto de la boleta es sospechoso"
            - "El nombre del beneficiario es sospechoso"
            - "La fecha de emisión es de 2021"
            - "Este tipo de documentos no existen"
- El cliente podrá registrar y enviar su respuesta sólo si ha contestado todo de forma correcta
- Los cliente tienen un rol "cliente" con acceso solo a la par publica.
- Y los usuarios de la base de datos que tengan un rol "admin" (rol asignado manualmente), podrán entrar al panel de administración.

- Panel de aministración privado
    Dentro del panel se podrá:
    - Listado de clientes con cada uno de los campos de contactos e identificar si contestaron correctamente.
    - Debe permitir descargar el listado en un archivo excel estructurado. 
    - Deberá tener una sección donde se podrá elegir al azar, el ganador del premio dentro de todos los que tengan las respuestas correctas.

- En la parte publica:
    - Deben estar todos los campos que los clientes necesitan llenar en formato formulario.
    - Solo se podrá enviar una respuesta por mail. Debe verificar si el correo ya existe en la lista o no, y enviar un mensaje que indique "Este correo ya está participando"
    - Si el formulario fue correctamente llenado se activará un botón de enviar respuesta. 
    - Debe tener una página de éxito con una texto que diga: "Muchas gracias por Participar. Haz detectado el Fraude VISIBLE, pero sabías que este documento esconde más cosas? 
    
        1.METADATA
        Sabías que el documento se editó en Canva durante 2024, pero fue creado en 2021.
        
        2. AGENTE SII DE LECTURA 
        El código Bidemensional de Boleta registra que el valor del monto real de la boleta es $108.000 y no $905.000 como indica el documento 
        
        3. DESVIACION DE MONTOS PROMEDIO: El valor promedio de una consulta para este tipo de terapias es de $50.000 este monto tiene una desviación muy alta, lo que despierta sosprechas.
        
        4. COALICION PRESTADOR BENEFICIARIO: El beneficiario a acudido más 15 veces durante los últimos 7 días con el mismo prestador y para la misma prestación.
        
        5. WATCHLIST: Hemos identificado que el rut de este beneficiario ya había tenido otros antecedentes de fraudes identificados."
    

En general:
    - Quiero publicar esta página en Gibhut para que diferentes personas puedan entrar a la URL.
    - Quiero que toda la información se almacene en una sola base de datos dentro de mi computador, puede ser en un excel o cvs.

Stack de tecnologia:
- HTML5
- CSS3 (con tailwind)
- JavaScript
- React
- Base datos y backend: Mi disco duro

Preferencias generales:
- Todos los textos visibles en la web deben estar en español.

Preferencias de diseño:
- Basate en el documento HTML del diseño que tienes en la carpeta design del proyecto
- Usa la imágen de la carpeta Logo para la marca


Preferencias de estilos:
- Colores 
- Uso de medidas en rem, usando un font-size base de 10px
- Uso de HTML5 y CSS3 nativo.
- Uso de buenas practicas de maquetación css y si es necesario usa flexbox y css grid layout.
- Que la webapp sea responsive.

Preferencias de código:
- No añadas dependencias externas.
- HTML debe ser semantico.
- Usa siempre let o const, y no uses nunca var.
- No uses alert, confirm o prompt, todo el feedback debe ser visual en el dom.
- Toda alerta o ventana modal que aparezca debe tener el mismo estilo que la web.
- No uses innerHTML, todo el contenido debe ser insertado con appendChild o previamente creando un elemento con document.createElement
- Cuidado con olvidar prevenir el default en los eventos submit o click.
- Prioriza el código legible y mantenible.
- Pririza que el codigo sea sencillo de entender.
- Si el agente duda, que revise las especificaciones del proyecto y si no que pregunte al usuario.

Estructura de archivos:
- carpeta (design)
- carpeta (logo)
- CLAUDE.md
- estructura de ficheros más adecuada para proyectos de react (lo elige el agente de ia)

