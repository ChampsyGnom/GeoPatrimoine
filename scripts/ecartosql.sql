--
-- PostgreSQL database dump
--

-- Dumped from database version 9.2.3
-- Dumped by pg_dump version 9.2.3
-- Started on 2013-12-16 12:56:51

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

DROP DATABASE ecarto;
--
-- TOC entry 2081 (class 1262 OID 117221)
-- Name: ecarto; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecarto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'French_France.1252' LC_CTYPE = 'French_France.1252';


ALTER DATABASE ecarto OWNER TO postgres;

\connect ecarto

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2082 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- TOC entry 195 (class 3079 OID 11727)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2084 (class 0 OID 0)
-- Dependencies: 195
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 188 (class 1259 OID 119087)
-- Name: domain; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE domain (
    id integer NOT NULL,
    display_name character varying(255) NOT NULL
);


ALTER TABLE public.domain OWNER TO postgres;

--
-- TOC entry 187 (class 1259 OID 119085)
-- Name: domain_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE domain_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.domain_id_seq OWNER TO postgres;

--
-- TOC entry 2085 (class 0 OID 0)
-- Dependencies: 187
-- Name: domain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE domain_id_seq OWNED BY domain.id;


--
-- TOC entry 168 (class 1259 OID 117222)
-- Name: label; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE label (
    id integer NOT NULL,
    style__id integer NOT NULL,
    font_family character varying(200),
    font_size integer,
    font_opacity integer,
    font_color character varying(6),
    font_weight character varying(50),
    stroke_color character varying(6),
    stroke_opacity integer,
    stroke_width integer,
    expression character varying(255)
);


ALTER TABLE public.label OWNER TO postgres;

--
-- TOC entry 169 (class 1259 OID 117228)
-- Name: label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE label_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.label_id_seq OWNER TO postgres;

--
-- TOC entry 2086 (class 0 OID 0)
-- Dependencies: 169
-- Name: label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE label_id_seq OWNED BY label.id;


--
-- TOC entry 170 (class 1259 OID 117230)
-- Name: node; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE node (
    id integer NOT NULL,
    template__id integer NOT NULL,
    display_name character varying(100) NOT NULL,
    parent_id integer,
    tree_order integer NOT NULL,
    map_order integer NOT NULL,
    node_type__id integer NOT NULL,
    tile_source character varying(100),
    tile_source_xyz_url character varying(255),
    tile_source_wms_url character varying(255),
    tile_source_wms_layer character varying(255),
    epsg character varying(20),
    postgre_db_id character varying(20),
    postgre_db_schema character varying(100),
    postgre_db_table character varying(100),
    postgre_db_column_id character varying(100),
    postgre_db_column_geom character varying(100),
    min_resolution integer,
    max_resolution integer,
    brightness integer,
    contrast integer,
    hue integer,
    opacity integer,
    saturation integer,
    view_table_position character varying(255),
    view_table_columns character varying(3000),
    view_form_columns character varying(3000),
    view_tooltip_columns character varying(3000),
    view_template_columns character varying(3000),
    postgre_db_reference_table character varying(255),
    postgre_db_reference_columns_mapping character varying(2000),
    postgre_db_reference_column_deb character varying(255),
    postgre_db_reference_column_fin character varying(255),
    postgre_db_column_deb character varying(255),
    postgre_db_column_fin character varying(255),
    postgre_db_geometry_mode character varying(255)
);


ALTER TABLE public.node OWNER TO postgres;

--
-- TOC entry 171 (class 1259 OID 117236)
-- Name: node_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE node_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.node_id_seq OWNER TO postgres;

--
-- TOC entry 2087 (class 0 OID 0)
-- Dependencies: 171
-- Name: node_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE node_id_seq OWNED BY node.id;


--
-- TOC entry 172 (class 1259 OID 117238)
-- Name: node_type; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE node_type (
    id integer NOT NULL,
    display_name character varying(50) NOT NULL
);


ALTER TABLE public.node_type OWNER TO postgres;

--
-- TOC entry 173 (class 1259 OID 117241)
-- Name: param; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE param (
    id integer NOT NULL,
    node__id integer NOT NULL,
    property character varying(100) NOT NULL,
    value character varying(255) NOT NULL
);


ALTER TABLE public.param OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 117244)
-- Name: param_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE param_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.param_id_seq OWNER TO postgres;

--
-- TOC entry 2088 (class 0 OID 0)
-- Dependencies: 174
-- Name: param_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE param_id_seq OWNED BY param.id;


--
-- TOC entry 186 (class 1259 OID 119079)
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE permission (
    id integer NOT NULL,
    display_name character varying(255) NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- TOC entry 185 (class 1259 OID 119077)
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO postgres;

--
-- TOC entry 2089 (class 0 OID 0)
-- Dependencies: 185
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE permission_id_seq OWNED BY permission.id;


--
-- TOC entry 175 (class 1259 OID 117246)
-- Name: preference; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE preference (
    id integer NOT NULL,
    user__id integer NOT NULL,
    node__id integer,
    property character varying(255) NOT NULL,
    value character varying(255)
);


ALTER TABLE public.preference OWNER TO postgres;

--
-- TOC entry 176 (class 1259 OID 117252)
-- Name: preference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE preference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.preference_id_seq OWNER TO postgres;

--
-- TOC entry 2090 (class 0 OID 0)
-- Dependencies: 176
-- Name: preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE preference_id_seq OWNED BY preference.id;


--
-- TOC entry 190 (class 1259 OID 119095)
-- Name: profil; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE profil (
    id integer NOT NULL,
    display_name character varying(255) NOT NULL,
    domain__id integer NOT NULL
);


ALTER TABLE public.profil OWNER TO postgres;

--
-- TOC entry 189 (class 1259 OID 119093)
-- Name: profil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE profil_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profil_id_seq OWNER TO postgres;

--
-- TOC entry 2091 (class 0 OID 0)
-- Dependencies: 189
-- Name: profil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE profil_id_seq OWNED BY profil.id;


--
-- TOC entry 192 (class 1259 OID 119108)
-- Name: profil_permission; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE profil_permission (
    id integer NOT NULL,
    profil__id integer NOT NULL,
    permission__id integer NOT NULL,
    allowed boolean NOT NULL
);


ALTER TABLE public.profil_permission OWNER TO postgres;

--
-- TOC entry 191 (class 1259 OID 119106)
-- Name: profil_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE profil_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profil_permission_id_seq OWNER TO postgres;

--
-- TOC entry 2092 (class 0 OID 0)
-- Dependencies: 191
-- Name: profil_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE profil_permission_id_seq OWNED BY profil_permission.id;


--
-- TOC entry 177 (class 1259 OID 117254)
-- Name: rule; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE rule (
    id integer NOT NULL,
    display_name character varying(100) NOT NULL,
    style__id integer NOT NULL,
    base_color character varying(6),
    point_type character varying(50),
    symbol_type character varying(50),
    point_symbol_opacity integer,
    point_symbol_size integer,
    point_stroke_color character varying(6),
    point_stroke_style character varying(50),
    point_stroke_width integer,
    point_stroke_opacity integer,
    point_icon_file character varying(255),
    point_icon_opacity integer,
    point_icon_width integer,
    point_icon_height integer,
    point_icon_rotation integer,
    point_icon_offset_x integer,
    point_icon_offset_y integer,
    line_stroke_size integer,
    line_stroke_opacity integer,
    line_stroke_style character varying(50),
    line_out_stroke_style character varying(50),
    line_out_stroke_color character varying(6),
    line_out_stroke_width integer,
    line_out_stroke_opacity integer,
    polygon_opacity integer,
    polygon_stroke_style character varying(50),
    polygon_stroke_color character varying(6),
    polygon_stroke_width integer,
    polygon_stroke_opacity integer,
    filter_min_value real,
    filter_max_value real,
    filter_unique_value real,
    filter_unique_string character varying(255),
    filter_column character varying(100)
);


ALTER TABLE public.rule OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 117260)
-- Name: rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE rule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rule_id_seq OWNER TO postgres;

--
-- TOC entry 2093 (class 0 OID 0)
-- Dependencies: 178
-- Name: rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE rule_id_seq OWNED BY rule.id;


--
-- TOC entry 179 (class 1259 OID 117262)
-- Name: style; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE style (
    id integer NOT NULL,
    display_name character varying(100) NOT NULL,
    node__id integer NOT NULL,
    type_style character varying(50),
    is_default integer
);


ALTER TABLE public.style OWNER TO postgres;

--
-- TOC entry 180 (class 1259 OID 117265)
-- Name: style_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE style_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.style_id_seq OWNER TO postgres;

--
-- TOC entry 2094 (class 0 OID 0)
-- Dependencies: 180
-- Name: style_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE style_id_seq OWNED BY style.id;


--
-- TOC entry 181 (class 1259 OID 117267)
-- Name: template; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE template (
    id integer NOT NULL,
    display_name character varying(100) NOT NULL,
    epsg character varying(10) NOT NULL,
    center_x double precision,
    center_y double precision
);


ALTER TABLE public.template OWNER TO postgres;

--
-- TOC entry 182 (class 1259 OID 117270)
-- Name: template_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE template_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.template_id_seq OWNER TO postgres;

--
-- TOC entry 2095 (class 0 OID 0)
-- Dependencies: 182
-- Name: template_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE template_id_seq OWNED BY template.id;


--
-- TOC entry 183 (class 1259 OID 117272)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "user" (
    id integer NOT NULL,
    login character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    name character varying(100) NOT NULL,
    first_name character varying(100) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 184 (class 1259 OID 117275)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 2096 (class 0 OID 0)
-- Dependencies: 184
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_id_seq OWNED BY "user".id;


--
-- TOC entry 194 (class 1259 OID 119126)
-- Name: user_profil; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE user_profil (
    profil__id integer NOT NULL,
    user__id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.user_profil OWNER TO postgres;

--
-- TOC entry 193 (class 1259 OID 119124)
-- Name: user_profil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE user_profil_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_profil_id_seq OWNER TO postgres;

--
-- TOC entry 2097 (class 0 OID 0)
-- Dependencies: 193
-- Name: user_profil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE user_profil_id_seq OWNED BY user_profil.id;


--
-- TOC entry 2005 (class 2604 OID 119090)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY domain ALTER COLUMN id SET DEFAULT nextval('domain_id_seq'::regclass);


--
-- TOC entry 1996 (class 2604 OID 117277)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY label ALTER COLUMN id SET DEFAULT nextval('label_id_seq'::regclass);


--
-- TOC entry 1997 (class 2604 OID 117278)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY node ALTER COLUMN id SET DEFAULT nextval('node_id_seq'::regclass);


--
-- TOC entry 1998 (class 2604 OID 117279)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY param ALTER COLUMN id SET DEFAULT nextval('param_id_seq'::regclass);


--
-- TOC entry 2004 (class 2604 OID 119082)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY permission ALTER COLUMN id SET DEFAULT nextval('permission_id_seq'::regclass);


--
-- TOC entry 1999 (class 2604 OID 117280)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY preference ALTER COLUMN id SET DEFAULT nextval('preference_id_seq'::regclass);


--
-- TOC entry 2006 (class 2604 OID 119098)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profil ALTER COLUMN id SET DEFAULT nextval('profil_id_seq'::regclass);


--
-- TOC entry 2007 (class 2604 OID 119111)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profil_permission ALTER COLUMN id SET DEFAULT nextval('profil_permission_id_seq'::regclass);


--
-- TOC entry 2000 (class 2604 OID 117281)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rule ALTER COLUMN id SET DEFAULT nextval('rule_id_seq'::regclass);


--
-- TOC entry 2001 (class 2604 OID 117282)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY style ALTER COLUMN id SET DEFAULT nextval('style_id_seq'::regclass);


--
-- TOC entry 2002 (class 2604 OID 117283)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY template ALTER COLUMN id SET DEFAULT nextval('template_id_seq'::regclass);


--
-- TOC entry 2003 (class 2604 OID 117284)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq'::regclass);


--
-- TOC entry 2008 (class 2604 OID 119129)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_profil ALTER COLUMN id SET DEFAULT nextval('user_profil_id_seq'::regclass);


--
-- TOC entry 2070 (class 0 OID 119087)
-- Dependencies: 188
-- Data for Name: domain; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2098 (class 0 OID 0)
-- Dependencies: 187
-- Name: domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('domain_id_seq', 1, false);


--
-- TOC entry 2050 (class 0 OID 117222)
-- Dependencies: 168
-- Data for Name: label; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2099 (class 0 OID 0)
-- Dependencies: 169
-- Name: label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('label_id_seq', 30, true);


--
-- TOC entry 2052 (class 0 OID 117230)
-- Dependencies: 170
-- Data for Name: node; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (415, 43, 'Osm', NULL, 1, 1, 2, 'Osm', NULL, NULL, NULL, '3857', NULL, NULL, NULL, NULL, NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (416, 43, 'Voirie', NULL, 2, 2, 3, NULL, NULL, NULL, NULL, '4326', 'Troyes', 'public', 'voirie_polyline', 'gid', 'geom', 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'column');
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (408, 42, 'Open Street Map', 407, 0, 1, 2, 'Osm', NULL, NULL, NULL, '3857', NULL, NULL, NULL, NULL, NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (409, 42, 'Bing Road', 407, 1, 2, 2, 'BingRoad', NULL, NULL, NULL, '3857', NULL, NULL, NULL, NULL, NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (410, 42, 'MapQuest', 407, 2, 3, 2, 'MapQuest', NULL, NULL, NULL, '3857', NULL, NULL, NULL, NULL, NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (411, 42, 'MapQuest Aerial', 407, 3, 4, 2, 'MapQuestAerial', NULL, NULL, NULL, '3857', NULL, NULL, NULL, NULL, NULL, 60, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (412, 42, 'Voirie', NULL, 1, 5, 3, NULL, NULL, NULL, NULL, '4326', 'Troyes', 'public', 'voirie_polyline', 'gid', 'geom', 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'column');
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (413, 42, 'Dégradation', NULL, 2, 6, 3, NULL, NULL, NULL, NULL, '4326', 'Troyes', 'public', 'degradation_point', 'gid', NULL, 0, 2000, 0, 100, 0, 100, 100, 'map', 'arrachemen;de_poule;faiencage;geom;glacage;grave;grave0;insee;longitudin;medium;medium0;nom_route;num_route;releve;reparation;rive;tranchee;transversa;troncon', NULL, NULL, NULL, 'voirie_polyline', 'insee;num_route;troncon|insee;num_route;troncon', 'abs_deb', 'abs_fin', NULL, NULL, 'geocode');
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (417, 42, 'Arrachement', NULL, 3, 7, 3, NULL, NULL, NULL, NULL, '4326', 'Troyes', 'public', 'arrachement_point', 'gid', NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, 'voirie_polyline', 'insee;num_route;troncon|insee;num_route;troncon', 'abs_deb', 'abs_fin', 'cumuld', 'cumulf', 'geocode');
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (418, 42, 'Réparation', NULL, 4, 8, 3, NULL, NULL, NULL, NULL, '4326', 'Troyes', 'public', 'reparation_point', 'gid', NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, 'voirie_polyline', 'insee;num_route;troncon|insee;num_route;troncon', 'abs_deb', 'abs_fin', 'cumuld', 'cumulf', 'geocode');
INSERT INTO node (id, template__id, display_name, parent_id, tree_order, map_order, node_type__id, tile_source, tile_source_xyz_url, tile_source_wms_url, tile_source_wms_layer, epsg, postgre_db_id, postgre_db_schema, postgre_db_table, postgre_db_column_id, postgre_db_column_geom, min_resolution, max_resolution, brightness, contrast, hue, opacity, saturation, view_table_position, view_table_columns, view_form_columns, view_tooltip_columns, view_template_columns, postgre_db_reference_table, postgre_db_reference_columns_mapping, postgre_db_reference_column_deb, postgre_db_reference_column_fin, postgre_db_column_deb, postgre_db_column_fin, postgre_db_geometry_mode) VALUES (407, 42, 'Fond de plan', NULL, 0, -1, 1, NULL, NULL, NULL, NULL, '4326', NULL, NULL, NULL, NULL, NULL, 0, 1000000, 0, 100, 0, 100, 100, 'tab', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- TOC entry 2100 (class 0 OID 0)
-- Dependencies: 171
-- Name: node_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('node_id_seq', 418, true);


--
-- TOC entry 2054 (class 0 OID 117238)
-- Dependencies: 172
-- Data for Name: node_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO node_type (id, display_name) VALUES (1, 'Dossier');
INSERT INTO node_type (id, display_name) VALUES (2, 'Tuile');
INSERT INTO node_type (id, display_name) VALUES (3, 'PostgreSQL');


--
-- TOC entry 2055 (class 0 OID 117241)
-- Dependencies: 173
-- Data for Name: param; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2101 (class 0 OID 0)
-- Dependencies: 174
-- Name: param_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('param_id_seq', 1582, true);


--
-- TOC entry 2068 (class 0 OID 119079)
-- Dependencies: 186
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2102 (class 0 OID 0)
-- Dependencies: 185
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('permission_id_seq', 1, false);


--
-- TOC entry 2057 (class 0 OID 117246)
-- Dependencies: 175
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO preference (id, user__id, node__id, property, value) VALUES (204, 1, 410, 'checked', 'false');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (201, 1, 408, 'checked', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (203, 1, 409, 'checked', 'false');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (202, 1, 407, 'expanded', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (207, 1, 413, 'checked', 'false');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (209, 1, 415, 'checked', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (210, 1, 416, 'checked', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (205, 1, 411, 'checked', 'false');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (212, 1, 418, 'checked', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (211, 1, 417, 'checked', 'true');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (1, 1, NULL, 'selected_template', '42');
INSERT INTO preference (id, user__id, node__id, property, value) VALUES (206, 1, 412, 'checked', 'false');


--
-- TOC entry 2103 (class 0 OID 0)
-- Dependencies: 176
-- Name: preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('preference_id_seq', 212, true);


--
-- TOC entry 2072 (class 0 OID 119095)
-- Dependencies: 190
-- Data for Name: profil; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2104 (class 0 OID 0)
-- Dependencies: 189
-- Name: profil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('profil_id_seq', 1, false);


--
-- TOC entry 2074 (class 0 OID 119108)
-- Dependencies: 192
-- Data for Name: profil_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2105 (class 0 OID 0)
-- Dependencies: 191
-- Name: profil_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('profil_permission_id_seq', 1, false);


--
-- TOC entry 2059 (class 0 OID 117254)
-- Dependencies: 177
-- Data for Name: rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (236, 'Basic', 139, 'C0C0C0', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', '333333', 1, 80, 100, 'solid', 'FFFFFF', 1, 80, NULL, NULL, NULL, NULL, NULL);
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (247, 'reparation <= 100', 142, 'eb4747', 'symbol', 'circle', 90, 12, 'C0C0C0', 'solid', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', 'FFFFFF', 1, 80, 100, 'solid', 'FFFFFF', 1, 80, 0, NULL, NULL, NULL, 'reparation');
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (248, '100 < reparation <= 200', 142, '008000', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', 'FFFFFF', 1, 80, 100, 'solid', 'FFFFFF', 1, 80, NULL, NULL, 0, NULL, 'reparation');
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (249, 'Basic', 143, 'CCFFCC', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', 'FFFFFF', 1, 80, 100, 'solid', 'FFFFFF', 1, 80, NULL, NULL, 0, NULL, 'tranchee');
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (250, 'Règle simple', 143, 'FF99CC', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', 'FFFFFF', 1, 80, 100, 'solid', 'FFFFFF', 1, 80, 0, NULL, NULL, NULL, 'tranchee');
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (251, 'Règle simple', 143, '008000', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', '008000', 4, 80, 100, 'solid', 'FFFFFF', 1, 80, NULL, NULL, 0, NULL, 'reparation');
INSERT INTO rule (id, display_name, style__id, base_color, point_type, symbol_type, point_symbol_opacity, point_symbol_size, point_stroke_color, point_stroke_style, point_stroke_width, point_stroke_opacity, point_icon_file, point_icon_opacity, point_icon_width, point_icon_height, point_icon_rotation, point_icon_offset_x, point_icon_offset_y, line_stroke_size, line_stroke_opacity, line_stroke_style, line_out_stroke_style, line_out_stroke_color, line_out_stroke_width, line_out_stroke_opacity, polygon_opacity, polygon_stroke_style, polygon_stroke_color, polygon_stroke_width, polygon_stroke_opacity, filter_min_value, filter_max_value, filter_unique_value, filter_unique_string, filter_column) VALUES (252, 'Règle simple', 143, 'FF0000', 'symbol', 'circle', 90, 12, 'C0C0C0', '1', 1, 90, NULL, 90, 12, 12, 0, 0, 0, 4, 100, 'solid', 'solid', '800000', 4, 80, 100, 'solid', 'FFFFFF', 1, 80, 0, NULL, NULL, NULL, 'reparation');


--
-- TOC entry 2106 (class 0 OID 0)
-- Dependencies: 178
-- Name: rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('rule_id_seq', 252, true);


--
-- TOC entry 2061 (class 0 OID 117262)
-- Dependencies: 179
-- Data for Name: style; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO style (id, display_name, node__id, type_style, is_default) VALUES (139, 'Nouveau style', 416, 'simple', 1);
INSERT INTO style (id, display_name, node__id, type_style, is_default) VALUES (142, 'Réparation', 413, 'simple', 1);
INSERT INTO style (id, display_name, node__id, type_style, is_default) VALUES (143, 'Multiple', 413, 'simple', 0);


--
-- TOC entry 2107 (class 0 OID 0)
-- Dependencies: 180
-- Name: style_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('style_id_seq', 143, true);


--
-- TOC entry 2063 (class 0 OID 117267)
-- Dependencies: 181
-- Data for Name: template; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO template (id, display_name, epsg, center_x, center_y) VALUES (42, 'Troyes', '3857', 4.0747350000000004, 48.296591900000003);
INSERT INTO template (id, display_name, epsg, center_x, center_y) VALUES (43, 'Troyes', '3857', 4.0747350000000004, 48.296591900000003);
INSERT INTO template (id, display_name, epsg, center_x, center_y) VALUES (44, 'Troyes', '3857', 4.0747350000000004, 48.296591900000003);


--
-- TOC entry 2108 (class 0 OID 0)
-- Dependencies: 182
-- Name: template_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('template_id_seq', 44, true);


--
-- TOC entry 2065 (class 0 OID 117272)
-- Dependencies: 183
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "user" (id, login, password, name, first_name) VALUES (1, 'loic', 'loic', 'loic', 'loic');


--
-- TOC entry 2109 (class 0 OID 0)
-- Dependencies: 184
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_id_seq', 1, true);


--
-- TOC entry 2076 (class 0 OID 119126)
-- Dependencies: 194
-- Data for Name: user_profil; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 2110 (class 0 OID 0)
-- Dependencies: 193
-- Name: user_profil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('user_profil_id_seq', 1, false);


--
-- TOC entry 2030 (class 2606 OID 119092)
-- Name: domain__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY domain
    ADD CONSTRAINT domain__pk PRIMARY KEY (id);


--
-- TOC entry 2010 (class 2606 OID 117286)
-- Name: label__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY label
    ADD CONSTRAINT label__pk PRIMARY KEY (id);


--
-- TOC entry 2012 (class 2606 OID 117288)
-- Name: node_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY node
    ADD CONSTRAINT node_pk PRIMARY KEY (id);


--
-- TOC entry 2014 (class 2606 OID 117290)
-- Name: node_type__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY node_type
    ADD CONSTRAINT node_type__pk PRIMARY KEY (id);


--
-- TOC entry 2016 (class 2606 OID 117292)
-- Name: param_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY param
    ADD CONSTRAINT param_pk PRIMARY KEY (id);


--
-- TOC entry 2028 (class 2606 OID 119084)
-- Name: permission__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY permission
    ADD CONSTRAINT permission__pk PRIMARY KEY (id);


--
-- TOC entry 2018 (class 2606 OID 117294)
-- Name: preference_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY preference
    ADD CONSTRAINT preference_pk PRIMARY KEY (id);


--
-- TOC entry 2032 (class 2606 OID 119100)
-- Name: profil__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY profil
    ADD CONSTRAINT profil__pk PRIMARY KEY (id);


--
-- TOC entry 2034 (class 2606 OID 119113)
-- Name: profil_permission__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY profil_permission
    ADD CONSTRAINT profil_permission__pk PRIMARY KEY (id);


--
-- TOC entry 2020 (class 2606 OID 117296)
-- Name: rule_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY rule
    ADD CONSTRAINT rule_pk PRIMARY KEY (id);


--
-- TOC entry 2022 (class 2606 OID 117298)
-- Name: style_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY style
    ADD CONSTRAINT style_pk PRIMARY KEY (id);


--
-- TOC entry 2024 (class 2606 OID 117300)
-- Name: template_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY template
    ADD CONSTRAINT template_pk PRIMARY KEY (id);


--
-- TOC entry 2026 (class 2606 OID 117302)
-- Name: user_pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pk PRIMARY KEY (id);


--
-- TOC entry 2036 (class 2606 OID 119131)
-- Name: user_profil__pk; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY user_profil
    ADD CONSTRAINT user_profil__pk PRIMARY KEY (id);


--
-- TOC entry 2037 (class 2606 OID 117344)
-- Name: label__style__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY label
    ADD CONSTRAINT label__style__fk FOREIGN KEY (style__id) REFERENCES style(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2038 (class 2606 OID 118942)
-- Name: node__node_type__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY node
    ADD CONSTRAINT node__node_type__fk FOREIGN KEY (node_type__id) REFERENCES node_type(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2039 (class 2606 OID 118947)
-- Name: node__template__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY node
    ADD CONSTRAINT node__template__fk FOREIGN KEY (template__id) REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2040 (class 2606 OID 117318)
-- Name: param__node_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY param
    ADD CONSTRAINT param__node_fk FOREIGN KEY (node__id) REFERENCES node(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2041 (class 2606 OID 117323)
-- Name: preference__node__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY preference
    ADD CONSTRAINT preference__node__fk FOREIGN KEY (node__id) REFERENCES node(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2042 (class 2606 OID 117328)
-- Name: preference__user__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY preference
    ADD CONSTRAINT preference__user__fk FOREIGN KEY (user__id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2045 (class 2606 OID 119101)
-- Name: profil__domain__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profil
    ADD CONSTRAINT profil__domain__fk FOREIGN KEY (domain__id) REFERENCES domain(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2046 (class 2606 OID 119114)
-- Name: profil_permission__permission_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profil_permission
    ADD CONSTRAINT profil_permission__permission_fk FOREIGN KEY (permission__id) REFERENCES permission(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2047 (class 2606 OID 119119)
-- Name: profil_permission__profil__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY profil_permission
    ADD CONSTRAINT profil_permission__profil__fk FOREIGN KEY (profil__id) REFERENCES profil(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2043 (class 2606 OID 117333)
-- Name: rule__style__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY rule
    ADD CONSTRAINT rule__style__fk FOREIGN KEY (style__id) REFERENCES style(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2044 (class 2606 OID 117338)
-- Name: style__node__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY style
    ADD CONSTRAINT style__node__fk FOREIGN KEY (node__id) REFERENCES node(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2049 (class 2606 OID 119137)
-- Name: user_profil__profil__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_profil
    ADD CONSTRAINT user_profil__profil__fk FOREIGN KEY (profil__id) REFERENCES profil(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2048 (class 2606 OID 119132)
-- Name: user_profil__user__fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY user_profil
    ADD CONSTRAINT user_profil__user__fk FOREIGN KEY (user__id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2083 (class 0 OID 0)
-- Dependencies: 6
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2013-12-16 12:56:52

--
-- PostgreSQL database dump complete
--

