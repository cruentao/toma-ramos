-- ================================================
-- SEED: Datos de prueba - Sistema Toma de Ramos
-- ================================================

-- Limpiar tablas en orden (respetando foreign keys)
DELETE FROM bloqueo_seccion;
DELETE FROM inscripcion;
DELETE FROM horario;
DELETE FROM malla_carrera;
DELETE FROM seccion;
DELETE FROM ramo;
DELETE FROM profesor;
DELETE FROM usuario;
DELETE FROM carrera;

-- Resetear secuencias
ALTER SEQUENCE carrera_id_seq RESTART WITH 1;
ALTER SEQUENCE usuario_id_seq RESTART WITH 1;
ALTER SEQUENCE profesor_id_seq RESTART WITH 1;
ALTER SEQUENCE ramo_id_seq RESTART WITH 1;
ALTER SEQUENCE seccion_id_seq RESTART WITH 1;
ALTER SEQUENCE horario_id_seq RESTART WITH 1;
ALTER SEQUENCE malla_carrera_id_seq RESTART WITH 1;
ALTER SEQUENCE inscripcion_id_seq RESTART WITH 1;
ALTER SEQUENCE bloqueo_seccion_id_seq RESTART WITH 1;

-- =========================
-- CARRERAS
-- =========================
INSERT INTO carrera (nombre) VALUES
  ('Psicología'),                    -- 1
  ('Ingeniería en Minas'),           -- 2
  ('Medicina'),                      -- 3
  ('Artes Visuales'),                -- 4
  ('Ingeniería Informática'),        -- 5
  ('Tecnología Médica'),             -- 6
  ('Administración de Empresas'),    -- 7
  ('Pedagogía en Historia');         -- 8

-- =========================
-- PROFESORES
-- =========================
INSERT INTO profesor (nombre, email) VALUES
  ('María González', 'maria.gonzalez@universidad.cl'),         -- 1
  ('Carlos Muñoz', 'carlos.munoz@universidad.cl'),             -- 2
  ('Andrea Silva', 'andrea.silva@universidad.cl'),             -- 3
  ('Roberto Pérez', 'roberto.perez@universidad.cl'),           -- 4
  ('Francisca López', 'francisca.lopez@universidad.cl'),       -- 5
  ('Juan Contreras', 'juan.contreras@universidad.cl'),         -- 6
  ('Patricia Rojas', 'patricia.rojas@universidad.cl'),         -- 7
  ('Miguel Soto', 'miguel.soto@universidad.cl'),               -- 8
  ('Claudia Fernández', 'claudia.fernandez@universidad.cl'),   -- 9
  ('Andrés Vargas', 'andres.vargas@universidad.cl'),           -- 10
  ('Valentina Torres', 'valentina.torres@universidad.cl'),     -- 11
  ('Diego Ramírez', 'diego.ramirez@universidad.cl'),           -- 12
  ('Camila Herrera', 'camila.herrera@universidad.cl'),         -- 13
  ('Felipe Castillo', 'felipe.castillo@universidad.cl'),       -- 14
  ('Lorena Morales', 'lorena.morales@universidad.cl'),         -- 15
  ('Sebastián Díaz', 'sebastian.diaz@universidad.cl'),         -- 16
  ('Isabel Fuentes', 'isabel.fuentes@universidad.cl'),         -- 17
  ('Rodrigo Espinoza', 'rodrigo.espinoza@universidad.cl'),     -- 18
  ('Carolina Bravo', 'carolina.bravo@universidad.cl'),         -- 19
  ('Tomás Reyes', 'tomas.reyes@universidad.cl');               -- 20

-- =========================
-- RAMOS
-- =========================

-- PSICOLOGÍA (ramos 1-8)
INSERT INTO ramo (nombre) VALUES
  ('Introducción a la Psicología'),           -- 1
  ('Filosofía y Epistemología'),              -- 2
  ('Neurociencias y Conducta'),               -- 3
  ('Psicología del Desarrollo'),              -- 4
  ('Psicología Social'),                      -- 5
  ('Psicopatología'),                         -- 6
  ('Metodología de Investigación'),           -- 7
  ('Psicología Clínica');                     -- 8

-- INGENIERÍA EN MINAS (ramos 9-16)
INSERT INTO ramo (nombre) VALUES
  ('Geología General'),                       -- 9
  ('Mineralogía y Petrografía'),              -- 10
  ('Mecánica de Rocas'),                      -- 11
  ('Métodos de Explotación Minera'),          -- 12
  ('Procesamiento de Minerales'),             -- 13
  ('Evaluación de Yacimientos'),              -- 14
  ('Planificación Minera'),                   -- 15
  ('Seguridad y Legislación Minera');         -- 16

-- MEDICINA (ramos 17-24)
INSERT INTO ramo (nombre) VALUES
  ('Anatomía Humana'),                        -- 17
  ('Biología Celular'),                       -- 18
  ('Fisiología Humana'),                      -- 19
  ('Histología y Embriología'),               -- 20
  ('Farmacología General'),                   -- 21
  ('Fisiopatología'),                         -- 22
  ('Semiología Médica'),                      -- 23
  ('Bioética Médica');                        -- 24

-- ARTES VISUALES (ramos 25-32)
INSERT INTO ramo (nombre) VALUES
  ('Fundamentos del Arte'),                   -- 25
  ('Dibujo y Composición'),                   -- 26
  ('Historia del Arte I'),                    -- 27
  ('Pintura I'),                              -- 28
  ('Escultura y Volumen'),                    -- 29
  ('Fotografía Artística'),                   -- 30
  ('Arte Contemporáneo'),                     -- 31
  ('Taller de Grabado');                      -- 32

-- INGENIERÍA INFORMÁTICA (ramos 33-40)
INSERT INTO ramo (nombre) VALUES
  ('Programación I'),                         -- 33
  ('Estructura de Datos'),                    -- 34
  ('Bases de Datos'),                         -- 35
  ('Redes de Computadores'),                  -- 36
  ('Ingeniería de Software'),                 -- 37
  ('Sistemas Operativos'),                    -- 38
  ('Desarrollo Web'),                         -- 39
  ('Inteligencia Artificial');                -- 40

-- TECNOLOGÍA MÉDICA (ramos 41-48)
INSERT INTO ramo (nombre) VALUES
  ('Anatomía y Fisiología'),                  -- 41
  ('Bioquímica Clínica'),                     -- 42
  ('Hematología Clínica'),                    -- 43
  ('Microbiología Médica'),                   -- 44
  ('Inmunología Clínica'),                    -- 45
  ('Parasitología'),                          -- 46
  ('Banco de Sangre'),                        -- 47
  ('Laboratorio Clínico');                    -- 48

-- ADMINISTRACIÓN DE EMPRESAS (ramos 49-56)
INSERT INTO ramo (nombre) VALUES
  ('Introducción a la Economía'),             -- 49
  ('Contabilidad General'),                   -- 50
  ('Marketing I'),                            -- 51
  ('Administración General'),                 -- 52
  ('Finanzas Corporativas'),                  -- 53
  ('Gestión de Recursos Humanos'),            -- 54
  ('Estadística para Negocios'),              -- 55
  ('Planificación Estratégica');              -- 56

-- PEDAGOGÍA EN HISTORIA (ramos 57-64)
INSERT INTO ramo (nombre) VALUES
  ('Historia de Chile I'),                    -- 57
  ('Historia Universal I'),                   -- 58
  ('Geografía Humana'),                       -- 59
  ('Historia de América Latina'),             -- 60
  ('Teoría de la Historia'),                  -- 61
  ('Didáctica de la Historia'),               -- 62
  ('Historia Contemporánea'),                 -- 63
  ('Ciudadanía y Formación Cívica');          -- 64

-- =========================
-- MALLA CARRERA (ramo + carrera + semestre)
-- =========================

-- Psicología
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (1, 1, 1), (1, 2, 1), (1, 3, 2), (1, 4, 3),
  (1, 5, 3), (1, 6, 5), (1, 7, 4), (1, 8, 7);

-- Ingeniería en Minas
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (2, 9, 1), (2, 10, 2), (2, 11, 4), (2, 12, 5),
  (2, 13, 5), (2, 14, 6), (2, 15, 7), (2, 16, 8);

-- Medicina
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (3, 17, 1), (3, 18, 1), (3, 19, 2), (3, 20, 2),
  (3, 21, 5), (3, 22, 5), (3, 23, 6), (3, 24, 3);

-- Artes Visuales
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (4, 25, 1), (4, 26, 1), (4, 27, 2), (4, 28, 3),
  (4, 29, 3), (4, 30, 4), (4, 31, 5), (4, 32, 4);

-- Ingeniería Informática
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (5, 33, 1), (5, 34, 2), (5, 35, 3), (5, 36, 4),
  (5, 37, 5), (5, 38, 4), (5, 39, 5), (5, 40, 7);

-- Tecnología Médica
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (6, 41, 1), (6, 42, 2), (6, 43, 3), (6, 44, 3),
  (6, 45, 4), (6, 46, 4), (6, 47, 6), (6, 48, 5);

-- Administración de Empresas
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (7, 49, 1), (7, 50, 1), (7, 51, 3), (7, 52, 2),
  (7, 53, 5), (7, 54, 4), (7, 55, 2), (7, 56, 7);

-- Pedagogía en Historia
INSERT INTO malla_carrera (carrera_id, ramo_id, semestre) VALUES
  (8, 57, 1), (8, 58, 1), (8, 59, 2), (8, 60, 3),
  (8, 61, 4), (8, 62, 5), (8, 63, 4), (8, 64, 6);

-- =========================
-- SECCIONES (2 secciones por ramo)
-- =========================

-- Psicología
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (1, 1, 40, 35), (1, 2, 40, 28),
  (2, 3, 35, 30), (2, 1, 35, 20),
  (3, 4, 30, 25), (3, 5, 30, 18),
  (4, 1, 40, 32), (4, 3, 40, 27),
  (5, 2, 45, 38), (5, 4, 45, 30),
  (6, 5, 30, 22), (6, 1, 30, 15),
  (7, 3, 35, 28), (7, 2, 35, 20),
  (8, 4, 25, 18), (8, 5, 25, 12);

-- Ingeniería en Minas
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (9, 6, 35, 30), (9, 7, 35, 22),
  (10, 8, 30, 25), (10, 6, 30, 18),
  (11, 7, 30, 20), (11, 8, 30, 15),
  (12, 6, 35, 28), (12, 7, 35, 20),
  (13, 8, 30, 22), (13, 6, 30, 16),
  (14, 7, 25, 18), (14, 8, 25, 12),
  (15, 6, 30, 22), (15, 7, 30, 18),
  (16, 8, 35, 28), (16, 6, 35, 20);

-- Medicina
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (17, 9, 50, 40), (17, 10, 50, 35),
  (18, 11, 45, 38), (18, 9, 45, 30),
  (19, 10, 40, 32), (19, 11, 40, 25),
  (20, 9, 40, 30), (20, 10, 40, 22),
  (21, 11, 35, 28), (21, 9, 35, 20),
  (22, 10, 35, 25), (22, 11, 35, 18),
  (23, 9, 30, 22), (23, 10, 30, 15),
  (24, 11, 40, 35), (24, 9, 40, 28);

-- Artes Visuales
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (25, 12, 25, 20), (25, 13, 25, 18),
  (26, 14, 20, 15), (26, 12, 20, 12),
  (27, 13, 30, 25), (27, 14, 30, 20),
  (28, 12, 20, 15), (28, 13, 20, 10),
  (29, 14, 15, 10), (29, 12, 15, 8),
  (30, 13, 20, 15), (30, 14, 20, 12),
  (31, 12, 30, 22), (31, 13, 30, 18),
  (32, 14, 15, 10), (32, 12, 15, 8);

-- Ingeniería Informática
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (33, 15, 40, 30), (33, 16, 40, 25),
  (34, 17, 35, 28), (34, 15, 35, 20),
  (35, 16, 35, 25), (35, 17, 35, 18),
  (36, 15, 30, 22), (36, 16, 30, 16),
  (37, 17, 35, 28), (37, 15, 35, 20),
  (38, 16, 30, 22), (38, 17, 30, 15),
  (39, 15, 35, 25), (39, 16, 35, 18),
  (40, 17, 30, 20), (40, 15, 30, 15);

-- Tecnología Médica
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (41, 18, 40, 32), (41, 19, 40, 28),
  (42, 20, 35, 28), (42, 18, 35, 22),
  (43, 19, 30, 24), (43, 20, 30, 18),
  (44, 18, 35, 28), (44, 19, 35, 20),
  (45, 20, 30, 22), (45, 18, 30, 16),
  (46, 19, 30, 24), (46, 20, 30, 18),
  (47, 18, 25, 18), (47, 19, 25, 12),
  (48, 20, 30, 22), (48, 18, 30, 16);

-- Administración de Empresas
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (49, 1, 50, 40), (49, 6, 50, 35),
  (50, 2, 45, 38), (50, 7, 45, 30),
  (51, 3, 40, 32), (51, 8, 40, 25),
  (52, 4, 45, 38), (52, 9, 45, 30),
  (53, 5, 35, 28), (53, 10, 35, 20),
  (54, 1, 40, 32), (54, 11, 40, 25),
  (55, 2, 40, 30), (55, 12, 40, 22),
  (56, 3, 35, 25), (56, 13, 35, 18);

-- Pedagogía en Historia
INSERT INTO seccion (ramo_id, profesor_id, cupos_totales, cupos_disponibles) VALUES
  (57, 14, 35, 28), (57, 15, 35, 22),
  (58, 16, 40, 32), (58, 17, 40, 25),
  (59, 18, 35, 28), (59, 19, 35, 20),
  (60, 20, 35, 28), (60, 14, 35, 22),
  (61, 15, 30, 24), (61, 16, 30, 18),
  (62, 17, 30, 22), (62, 18, 30, 16),
  (63, 19, 35, 28), (63, 20, 35, 20),
  (64, 14, 35, 28), (64, 15, 35, 22);

-- =========================
-- HORARIOS (para cada sección)
-- =========================

-- Psicología - Intro Psicología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (1, 'Lunes', '08:30', '10:00'), (1, 'Miércoles', '08:30', '10:00'),
  (2, 'Martes', '10:15', '11:45'), (2, 'Jueves', '10:15', '11:45');

-- Psicología - Filosofía y Epistemología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (3, 'Martes', '08:30', '10:00'), (3, 'Jueves', '08:30', '10:00'),
  (4, 'Lunes', '14:00', '15:30'), (4, 'Miércoles', '14:00', '15:30');

-- Psicología - Neurociencias
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (5, 'Lunes', '10:15', '11:45'), (5, 'Miércoles', '10:15', '11:45'),
  (6, 'Martes', '14:00', '15:30'), (6, 'Jueves', '14:00', '15:30');

-- Psicología - Desarrollo
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (7, 'Miércoles', '08:30', '10:00'), (7, 'Viernes', '08:30', '10:00'),
  (8, 'Lunes', '15:45', '17:15'), (8, 'Miércoles', '15:45', '17:15');

-- Psicología - Social
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (9, 'Martes', '08:30', '10:00'), (9, 'Jueves', '08:30', '10:00'),
  (10, 'Lunes', '12:00', '13:30'), (10, 'Miércoles', '12:00', '13:30');

-- Psicología - Psicopatología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (11, 'Lunes', '10:15', '11:45'), (11, 'Jueves', '10:15', '11:45'),
  (12, 'Martes', '15:45', '17:15'), (12, 'Viernes', '15:45', '17:15');

-- Psicología - Metodología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (13, 'Miércoles', '10:15', '11:45'), (13, 'Viernes', '10:15', '11:45'),
  (14, 'Martes', '12:00', '13:30'), (14, 'Jueves', '12:00', '13:30');

-- Psicología - Clínica
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (15, 'Lunes', '14:00', '15:30'), (15, 'Miércoles', '14:00', '15:30'),
  (16, 'Martes', '10:15', '11:45'), (16, 'Jueves', '10:15', '11:45');

-- Ing. Minas - Geología General
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (17, 'Lunes', '08:30', '10:00'), (17, 'Miércoles', '08:30', '10:00'),
  (18, 'Martes', '10:15', '11:45'), (18, 'Jueves', '10:15', '11:45');

-- Ing. Minas - Mineralogía
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (19, 'Martes', '08:30', '10:00'), (19, 'Jueves', '08:30', '10:00'),
  (20, 'Lunes', '14:00', '15:30'), (20, 'Miércoles', '14:00', '15:30');

-- Ing. Minas - Mecánica de Rocas
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (21, 'Lunes', '10:15', '11:45'), (21, 'Miércoles', '10:15', '11:45'),
  (22, 'Martes', '14:00', '15:30'), (22, 'Jueves', '14:00', '15:30');

-- Ing. Minas - Métodos Explotación
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (23, 'Miércoles', '08:30', '10:00'), (23, 'Viernes', '08:30', '10:00'),
  (24, 'Lunes', '15:45', '17:15'), (24, 'Miércoles', '15:45', '17:15');

-- Ing. Minas - Procesamiento Minerales
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (25, 'Martes', '10:15', '11:45'), (25, 'Jueves', '10:15', '11:45'),
  (26, 'Lunes', '12:00', '13:30'), (26, 'Miércoles', '12:00', '13:30');

-- Ing. Minas - Evaluación Yacimientos
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (27, 'Lunes', '08:30', '10:00'), (27, 'Jueves', '08:30', '10:00'),
  (28, 'Martes', '15:45', '17:15'), (28, 'Viernes', '15:45', '17:15');

-- Ing. Minas - Planificación Minera
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (29, 'Miércoles', '10:15', '11:45'), (29, 'Viernes', '10:15', '11:45'),
  (30, 'Martes', '12:00', '13:30'), (30, 'Jueves', '12:00', '13:30');

-- Ing. Minas - Seguridad y Legislación
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (31, 'Lunes', '14:00', '15:30'), (31, 'Miércoles', '14:00', '15:30'),
  (32, 'Martes', '08:30', '10:00'), (32, 'Jueves', '08:30', '10:00');

-- Medicina - Anatomía Humana
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (33, 'Lunes', '08:30', '10:00'), (33, 'Miércoles', '08:30', '10:00'), (33, 'Viernes', '08:30', '10:00'),
  (34, 'Martes', '08:30', '10:00'), (34, 'Jueves', '08:30', '10:00');

-- Medicina - Biología Celular
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (35, 'Martes', '10:15', '11:45'), (35, 'Jueves', '10:15', '11:45'),
  (36, 'Lunes', '10:15', '11:45'), (36, 'Miércoles', '10:15', '11:45');

-- Medicina - Fisiología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (37, 'Lunes', '14:00', '15:30'), (37, 'Miércoles', '14:00', '15:30'),
  (38, 'Martes', '14:00', '15:30'), (38, 'Jueves', '14:00', '15:30');

-- Medicina - Histología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (39, 'Martes', '08:30', '10:00'), (39, 'Viernes', '08:30', '10:00'),
  (40, 'Lunes', '12:00', '13:30'), (40, 'Miércoles', '12:00', '13:30');

-- Medicina - Farmacología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (41, 'Lunes', '10:15', '11:45'), (41, 'Jueves', '10:15', '11:45'),
  (42, 'Martes', '15:45', '17:15'), (42, 'Viernes', '15:45', '17:15');

-- Medicina - Fisiopatología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (43, 'Miércoles', '10:15', '11:45'), (43, 'Viernes', '10:15', '11:45'),
  (44, 'Martes', '12:00', '13:30'), (44, 'Jueves', '12:00', '13:30');

-- Medicina - Semiología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (45, 'Lunes', '15:45', '17:15'), (45, 'Miércoles', '15:45', '17:15'),
  (46, 'Martes', '08:30', '10:00'), (46, 'Jueves', '08:30', '10:00');

-- Medicina - Bioética
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (47, 'Viernes', '10:15', '11:45'),
  (48, 'Viernes', '14:00', '15:30');

-- Artes Visuales - Fundamentos del Arte
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (49, 'Lunes', '08:30', '10:00'), (49, 'Miércoles', '08:30', '10:00'),
  (50, 'Martes', '10:15', '11:45'), (50, 'Jueves', '10:15', '11:45');

-- Artes Visuales - Dibujo y Composición
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (51, 'Martes', '08:30', '11:45'),
  (52, 'Jueves', '08:30', '11:45');

-- Artes Visuales - Historia del Arte I
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (53, 'Lunes', '14:00', '15:30'), (53, 'Miércoles', '14:00', '15:30'),
  (54, 'Martes', '14:00', '15:30'), (54, 'Jueves', '14:00', '15:30');

-- Artes Visuales - Pintura I
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (55, 'Miércoles', '08:30', '11:45'),
  (56, 'Viernes', '08:30', '11:45');

-- Artes Visuales - Escultura
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (57, 'Lunes', '14:00', '17:15'),
  (58, 'Martes', '14:00', '17:15');

-- Artes Visuales - Fotografía
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (59, 'Jueves', '14:00', '15:30'), (59, 'Viernes', '14:00', '15:30'),
  (60, 'Lunes', '10:15', '11:45'), (60, 'Miércoles', '10:15', '11:45');

-- Artes Visuales - Arte Contemporáneo
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (61, 'Martes', '12:00', '13:30'), (61, 'Jueves', '12:00', '13:30'),
  (62, 'Lunes', '15:45', '17:15'), (62, 'Miércoles', '15:45', '17:15');

-- Artes Visuales - Grabado
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (63, 'Viernes', '08:30', '11:45'),
  (64, 'Viernes', '14:00', '17:15');

-- Ing. Informática - Programación I
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (65, 'Lunes', '08:30', '10:00'), (65, 'Miércoles', '08:30', '10:00'),
  (66, 'Martes', '10:15', '11:45'), (66, 'Jueves', '10:15', '11:45');

-- Ing. Informática - Estructura de Datos
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (67, 'Martes', '08:30', '10:00'), (67, 'Jueves', '08:30', '10:00'),
  (68, 'Lunes', '14:00', '15:30'), (68, 'Miércoles', '14:00', '15:30');

-- Ing. Informática - Bases de Datos
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (69, 'Lunes', '10:15', '11:45'), (69, 'Miércoles', '10:15', '11:45'),
  (70, 'Martes', '14:00', '15:30'), (70, 'Jueves', '14:00', '15:30');

-- Ing. Informática - Redes
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (71, 'Miércoles', '08:30', '10:00'), (71, 'Viernes', '08:30', '10:00'),
  (72, 'Lunes', '15:45', '17:15'), (72, 'Miércoles', '15:45', '17:15');

-- Ing. Informática - Ing. Software
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (73, 'Martes', '10:15', '11:45'), (73, 'Jueves', '10:15', '11:45'),
  (74, 'Lunes', '12:00', '13:30'), (74, 'Miércoles', '12:00', '13:30');

-- Ing. Informática - Sistemas Operativos
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (75, 'Lunes', '08:30', '10:00'), (75, 'Jueves', '08:30', '10:00'),
  (76, 'Martes', '15:45', '17:15'), (76, 'Viernes', '15:45', '17:15');

-- Ing. Informática - Desarrollo Web
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (77, 'Miércoles', '10:15', '11:45'), (77, 'Viernes', '10:15', '11:45'),
  (78, 'Martes', '12:00', '13:30'), (78, 'Jueves', '12:00', '13:30');

-- Ing. Informática - IA
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (79, 'Lunes', '14:00', '15:30'), (79, 'Miércoles', '14:00', '15:30'),
  (80, 'Martes', '08:30', '10:00'), (80, 'Jueves', '08:30', '10:00');

-- Tec. Médica - Anatomía y Fisiología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (81, 'Lunes', '08:30', '10:00'), (81, 'Miércoles', '08:30', '10:00'),
  (82, 'Martes', '10:15', '11:45'), (82, 'Jueves', '10:15', '11:45');

-- Tec. Médica - Bioquímica Clínica
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (83, 'Martes', '08:30', '10:00'), (83, 'Jueves', '08:30', '10:00'),
  (84, 'Lunes', '14:00', '15:30'), (84, 'Miércoles', '14:00', '15:30');

-- Tec. Médica - Hematología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (85, 'Lunes', '10:15', '11:45'), (85, 'Miércoles', '10:15', '11:45'),
  (86, 'Martes', '14:00', '15:30'), (86, 'Jueves', '14:00', '15:30');

-- Tec. Médica - Microbiología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (87, 'Miércoles', '08:30', '10:00'), (87, 'Viernes', '08:30', '10:00'),
  (88, 'Lunes', '15:45', '17:15'), (88, 'Miércoles', '15:45', '17:15');

-- Tec. Médica - Inmunología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (89, 'Martes', '10:15', '11:45'), (89, 'Jueves', '10:15', '11:45'),
  (90, 'Lunes', '12:00', '13:30'), (90, 'Miércoles', '12:00', '13:30');

-- Tec. Médica - Parasitología
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (91, 'Lunes', '08:30', '10:00'), (91, 'Jueves', '08:30', '10:00'),
  (92, 'Martes', '15:45', '17:15'), (92, 'Viernes', '15:45', '17:15');

-- Tec. Médica - Banco de Sangre
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (93, 'Miércoles', '10:15', '11:45'), (93, 'Viernes', '10:15', '11:45'),
  (94, 'Martes', '12:00', '13:30'), (94, 'Jueves', '12:00', '13:30');

-- Tec. Médica - Laboratorio Clínico
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (95, 'Lunes', '14:00', '15:30'), (95, 'Miércoles', '14:00', '15:30'),
  (96, 'Martes', '08:30', '10:00'), (96, 'Jueves', '08:30', '10:00');

-- Admin. Empresas - Intro Economía
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (97, 'Lunes', '08:30', '10:00'), (97, 'Miércoles', '08:30', '10:00'),
  (98, 'Martes', '10:15', '11:45'), (98, 'Jueves', '10:15', '11:45');

-- Admin. Empresas - Contabilidad
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (99, 'Martes', '08:30', '10:00'), (99, 'Jueves', '08:30', '10:00'),
  (100, 'Lunes', '14:00', '15:30'), (100, 'Miércoles', '14:00', '15:30');

-- Admin. Empresas - Marketing
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (101, 'Lunes', '10:15', '11:45'), (101, 'Miércoles', '10:15', '11:45'),
  (102, 'Martes', '14:00', '15:30'), (102, 'Jueves', '14:00', '15:30');

-- Admin. Empresas - Administración General
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (103, 'Miércoles', '08:30', '10:00'), (103, 'Viernes', '08:30', '10:00'),
  (104, 'Lunes', '15:45', '17:15'), (104, 'Miércoles', '15:45', '17:15');

-- Admin. Empresas - Finanzas
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (105, 'Martes', '10:15', '11:45'), (105, 'Jueves', '10:15', '11:45'),
  (106, 'Lunes', '12:00', '13:30'), (106, 'Miércoles', '12:00', '13:30');

-- Admin. Empresas - RRHH
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (107, 'Lunes', '08:30', '10:00'), (107, 'Jueves', '08:30', '10:00'),
  (108, 'Martes', '15:45', '17:15'), (108, 'Viernes', '15:45', '17:15');

-- Admin. Empresas - Estadística
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (109, 'Miércoles', '10:15', '11:45'), (109, 'Viernes', '10:15', '11:45'),
  (110, 'Martes', '12:00', '13:30'), (110, 'Jueves', '12:00', '13:30');

-- Admin. Empresas - Planificación Estratégica
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (111, 'Lunes', '14:00', '15:30'), (111, 'Miércoles', '14:00', '15:30'),
  (112, 'Martes', '08:30', '10:00'), (112, 'Jueves', '08:30', '10:00');

-- Pedagogía Historia - Historia de Chile I
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (113, 'Lunes', '08:30', '10:00'), (113, 'Miércoles', '08:30', '10:00'),
  (114, 'Martes', '10:15', '11:45'), (114, 'Jueves', '10:15', '11:45');

-- Pedagogía Historia - Historia Universal I
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (115, 'Martes', '08:30', '10:00'), (115, 'Jueves', '08:30', '10:00'),
  (116, 'Lunes', '14:00', '15:30'), (116, 'Miércoles', '14:00', '15:30');

-- Pedagogía Historia - Geografía Humana
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (117, 'Lunes', '10:15', '11:45'), (117, 'Miércoles', '10:15', '11:45'),
  (118, 'Martes', '14:00', '15:30'), (118, 'Jueves', '14:00', '15:30');

-- Pedagogía Historia - Historia de América Latina
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (119, 'Miércoles', '08:30', '10:00'), (119, 'Viernes', '08:30', '10:00'),
  (120, 'Lunes', '15:45', '17:15'), (120, 'Miércoles', '15:45', '17:15');

-- Pedagogía Historia - Teoría de la Historia
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (121, 'Martes', '10:15', '11:45'), (121, 'Jueves', '10:15', '11:45'),
  (122, 'Lunes', '12:00', '13:30'), (122, 'Miércoles', '12:00', '13:30');

-- Pedagogía Historia - Didáctica
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (123, 'Lunes', '08:30', '10:00'), (123, 'Jueves', '08:30', '10:00'),
  (124, 'Martes', '15:45', '17:15'), (124, 'Viernes', '15:45', '17:15');

-- Pedagogía Historia - Historia Contemporánea
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (125, 'Miércoles', '10:15', '11:45'), (125, 'Viernes', '10:15', '11:45'),
  (126, 'Martes', '12:00', '13:30'), (126, 'Jueves', '12:00', '13:30');

-- Pedagogía Historia - Ciudadanía
INSERT INTO horario (seccion_id, dia, hora_inicio, hora_fin) VALUES
  (127, 'Lunes', '14:00', '15:30'), (127, 'Miércoles', '14:00', '15:30'),
  (128, 'Martes', '08:30', '10:00'), (128, 'Jueves', '08:30', '10:00');

-- =========================
-- FIN DEL SEED
-- =========================
