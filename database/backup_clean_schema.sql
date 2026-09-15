--
-- PostgreSQL database dump
--

-- restrict safe

-- Dumped from database version 13.23
-- Dumped by pg_dump version 13.23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.reflections DROP CONSTRAINT IF EXISTS reflections_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.reflections DROP CONSTRAINT IF EXISTS reflections_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_savings DROP CONSTRAINT IF EXISTS payment_savings_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_items DROP CONSTRAINT IF EXISTS payment_items_finance_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_items DROP CONSTRAINT IF EXISTS payment_items_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_discounts DROP CONSTRAINT IF EXISTS payment_discounts_finance_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_discounts DROP CONSTRAINT IF EXISTS payment_discounts_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.payment_billings DROP CONSTRAINT IF EXISTS payment_billings_finance_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_mentor_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_media_project_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_admin_teacher_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_task_likes DROP CONSTRAINT IF EXISTS media_task_likes_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_task_likes DROP CONSTRAINT IF EXISTS media_task_likes_media_task_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_task_collaborators DROP CONSTRAINT IF EXISTS media_task_collaborators_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_task_collaborators DROP CONSTRAINT IF EXISTS media_task_collaborators_media_task_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_task_collaborators DROP CONSTRAINT IF EXISTS media_task_collaborators_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_projects DROP CONSTRAINT IF EXISTS media_projects_project_manager_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_projects DROP CONSTRAINT IF EXISTS media_projects_mentor_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_projects DROP CONSTRAINT IF EXISTS media_projects_creator_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_projects DROP CONSTRAINT IF EXISTS media_projects_admin_teacher_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_project_participants DROP CONSTRAINT IF EXISTS media_project_participants_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_project_participants DROP CONSTRAINT IF EXISTS media_project_participants_media_project_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_project_participants DROP CONSTRAINT IF EXISTS media_project_participants_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_notifications DROP CONSTRAINT IF EXISTS media_notifications_sender_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_notifications DROP CONSTRAINT IF EXISTS media_notifications_recipient_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_comments DROP CONSTRAINT IF EXISTS media_comments_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_comments DROP CONSTRAINT IF EXISTS media_comments_media_task_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_blogs DROP CONSTRAINT IF EXISTS media_blogs_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_blog_likes DROP CONSTRAINT IF EXISTS media_blog_likes_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_blog_likes DROP CONSTRAINT IF EXISTS media_blog_likes_media_blog_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_blog_comments DROP CONSTRAINT IF EXISTS media_blog_comments_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.media_blog_comments DROP CONSTRAINT IF EXISTS media_blog_comments_media_blog_id_foreign;
ALTER TABLE IF EXISTS ONLY public.finance_items DROP CONSTRAINT IF EXISTS finance_items_finance_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.emails DROP CONSTRAINT IF EXISTS emails_email_account_id_foreign;
ALTER TABLE IF EXISTS ONLY public.email_accounts DROP CONSTRAINT IF EXISTS email_accounts_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.developer_api_keys DROP CONSTRAINT IF EXISTS developer_api_keys_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.api_request_logs DROP CONSTRAINT IF EXISTS api_request_logs_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.api_request_logs DROP CONSTRAINT IF EXISTS api_request_logs_api_key_id_foreign;
ALTER TABLE IF EXISTS ONLY public.academy_scores DROP CONSTRAINT IF EXISTS academy_scores_admin_student_id_foreign;
ALTER TABLE IF EXISTS ONLY public.academy_scores DROP CONSTRAINT IF EXISTS academy_scores_academy_competence_id_foreign;
ALTER TABLE IF EXISTS ONLY public.academy_competences DROP CONSTRAINT IF EXISTS academy_competences_admin_teacher_id_foreign;
ALTER TABLE IF EXISTS ONLY public.academy_competences DROP CONSTRAINT IF EXISTS academy_competences_academy_subject_id_foreign;
ALTER TABLE IF EXISTS ONLY public.academy_awards DROP CONSTRAINT IF EXISTS academy_awards_admin_student_id_foreign;
DROP INDEX IF EXISTS public.users_mongodb_id_index;
DROP INDEX IF EXISTS public.sessions_user_id_index;
DROP INDEX IF EXISTS public.sessions_last_activity_index;
DROP INDEX IF EXISTS public.reflections_user_id_date_index;
DROP INDEX IF EXISTS public.reflections_admin_student_id_date_index;
DROP INDEX IF EXISTS public.personal_access_tokens_tokenable_type_tokenable_id_index;
DROP INDEX IF EXISTS public.oauth_refresh_tokens_access_token_id_index;
DROP INDEX IF EXISTS public.oauth_clients_user_id_index;
DROP INDEX IF EXISTS public.oauth_auth_codes_user_id_index;
DROP INDEX IF EXISTS public.oauth_access_tokens_user_id_index;
DROP INDEX IF EXISTS public.notifications_notifiable_type_notifiable_id_index;
DROP INDEX IF EXISTS public.media_tasks_mongodb_id_index;
DROP INDEX IF EXISTS public.media_tasks_admin_student_id_status_index;
DROP INDEX IF EXISTS public.media_task_collaborators_media_task_id_admin_student_id_index;
DROP INDEX IF EXISTS public.media_projects_mongodb_id_index;
DROP INDEX IF EXISTS public.media_project_participants_media_project_id_admin_student_id_in;
DROP INDEX IF EXISTS public.media_notifications_mongodb_id_index;
DROP INDEX IF EXISTS public.media_comments_mongodb_id_index;
DROP INDEX IF EXISTS public.media_blogs_mongodb_id_index;
DROP INDEX IF EXISTS public.media_blogs_category_index;
DROP INDEX IF EXISTS public.media_blog_comments_mongodb_id_index;
DROP INDEX IF EXISTS public.emails_uid_index;
DROP INDEX IF EXISTS public.emails_folder_index;
DROP INDEX IF EXISTS public.developer_api_keys_key_prefix_index;
DROP INDEX IF EXISTS public.developer_api_keys_key_hash_index;
DROP INDEX IF EXISTS public.api_request_logs_tier_index;
DROP INDEX IF EXISTS public.api_request_logs_status_code_index;
DROP INDEX IF EXISTS public.api_request_logs_request_id_index;
DROP INDEX IF EXISTS public.api_request_logs_endpoint_index;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_instagram_id_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.reflections DROP CONSTRAINT IF EXISTS reflections_pkey;
ALTER TABLE IF EXISTS ONLY public.personal_access_tokens DROP CONSTRAINT IF EXISTS personal_access_tokens_token_unique;
ALTER TABLE IF EXISTS ONLY public.personal_access_tokens DROP CONSTRAINT IF EXISTS personal_access_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_savings DROP CONSTRAINT IF EXISTS payment_savings_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_items DROP CONSTRAINT IF EXISTS payment_items_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_discounts DROP CONSTRAINT IF EXISTS payment_discounts_pkey;
ALTER TABLE IF EXISTS ONLY public.payment_billings DROP CONSTRAINT IF EXISTS payment_billings_pkey;
ALTER TABLE IF EXISTS ONLY public.password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.oauth_refresh_tokens DROP CONSTRAINT IF EXISTS oauth_refresh_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.oauth_personal_access_clients DROP CONSTRAINT IF EXISTS oauth_personal_access_clients_pkey;
ALTER TABLE IF EXISTS ONLY public.oauth_clients DROP CONSTRAINT IF EXISTS oauth_clients_pkey;
ALTER TABLE IF EXISTS ONLY public.oauth_auth_codes DROP CONSTRAINT IF EXISTS oauth_auth_codes_pkey;
ALTER TABLE IF EXISTS ONLY public.oauth_access_tokens DROP CONSTRAINT IF EXISTS oauth_access_tokens_pkey;
ALTER TABLE IF EXISTS ONLY public.notifications DROP CONSTRAINT IF EXISTS notifications_pkey;
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.media_tasks DROP CONSTRAINT IF EXISTS media_tasks_pkey;
ALTER TABLE IF EXISTS ONLY public.media_task_likes DROP CONSTRAINT IF EXISTS media_task_likes_pkey;
ALTER TABLE IF EXISTS ONLY public.media_task_likes DROP CONSTRAINT IF EXISTS media_task_likes_media_task_id_user_id_unique;
ALTER TABLE IF EXISTS ONLY public.media_task_collaborators DROP CONSTRAINT IF EXISTS media_task_collaborators_pkey;
ALTER TABLE IF EXISTS ONLY public.media_projects DROP CONSTRAINT IF EXISTS media_projects_pkey;
ALTER TABLE IF EXISTS ONLY public.media_project_participants DROP CONSTRAINT IF EXISTS media_project_participants_pkey;
ALTER TABLE IF EXISTS ONLY public.media_notifications DROP CONSTRAINT IF EXISTS media_notifications_pkey;
ALTER TABLE IF EXISTS ONLY public.media_comments DROP CONSTRAINT IF EXISTS media_comments_pkey;
ALTER TABLE IF EXISTS ONLY public.media_blogs DROP CONSTRAINT IF EXISTS media_blogs_slug_unique;
ALTER TABLE IF EXISTS ONLY public.media_blogs DROP CONSTRAINT IF EXISTS media_blogs_pkey;
ALTER TABLE IF EXISTS ONLY public.media_blog_likes DROP CONSTRAINT IF EXISTS media_blog_likes_pkey;
ALTER TABLE IF EXISTS ONLY public.media_blog_likes DROP CONSTRAINT IF EXISTS media_blog_likes_media_blog_id_user_id_unique;
ALTER TABLE IF EXISTS ONLY public.media_blog_comments DROP CONSTRAINT IF EXISTS media_blog_comments_pkey;
ALTER TABLE IF EXISTS ONLY public.finance_items DROP CONSTRAINT IF EXISTS finance_items_pkey;
ALTER TABLE IF EXISTS ONLY public.finance_deposits DROP CONSTRAINT IF EXISTS finance_deposits_pkey;
ALTER TABLE IF EXISTS ONLY public.finance_accounts DROP CONSTRAINT IF EXISTS finance_accounts_pkey;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_uuid_unique;
ALTER TABLE IF EXISTS ONLY public.failed_jobs DROP CONSTRAINT IF EXISTS failed_jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.emails DROP CONSTRAINT IF EXISTS emails_pkey;
ALTER TABLE IF EXISTS ONLY public.email_accounts DROP CONSTRAINT IF EXISTS email_accounts_pkey;
ALTER TABLE IF EXISTS ONLY public.email_accounts DROP CONSTRAINT IF EXISTS email_accounts_email_unique;
ALTER TABLE IF EXISTS ONLY public.developer_api_keys DROP CONSTRAINT IF EXISTS developer_api_keys_pkey;
ALTER TABLE IF EXISTS ONLY public.api_request_logs DROP CONSTRAINT IF EXISTS api_request_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_teachers DROP CONSTRAINT IF EXISTS admin_teachers_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_teachers DROP CONSTRAINT IF EXISTS admin_teachers_nig_unique;
ALTER TABLE IF EXISTS ONLY public.admin_students DROP CONSTRAINT IF EXISTS admin_students_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_students DROP CONSTRAINT IF EXISTS admin_students_nis_unique;
ALTER TABLE IF EXISTS ONLY public.admin_schools DROP CONSTRAINT IF EXISTS admin_schools_pkey;
ALTER TABLE IF EXISTS ONLY public.admin_events DROP CONSTRAINT IF EXISTS admin_events_pkey;
ALTER TABLE IF EXISTS ONLY public.academy_subjects DROP CONSTRAINT IF EXISTS academy_subjects_pkey;
ALTER TABLE IF EXISTS ONLY public.academy_scores DROP CONSTRAINT IF EXISTS academy_scores_pkey;
ALTER TABLE IF EXISTS ONLY public.academy_courses DROP CONSTRAINT IF EXISTS academy_courses_pkey;
ALTER TABLE IF EXISTS ONLY public.academy_competences DROP CONSTRAINT IF EXISTS academy_competences_pkey;
ALTER TABLE IF EXISTS ONLY public.academy_awards DROP CONSTRAINT IF EXISTS academy_awards_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reflections ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.personal_access_tokens ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_savings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_discounts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payment_billings ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.oauth_personal_access_clients ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.oauth_clients ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_tasks ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_task_likes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_task_collaborators ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_projects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_project_participants ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_notifications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_comments ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_blogs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_blog_likes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media_blog_comments ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.finance_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.finance_deposits ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.finance_accounts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.failed_jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.emails ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.email_accounts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.developer_api_keys ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.api_request_logs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_teachers ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_students ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_schools ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.admin_events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.academy_subjects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.academy_scores ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.academy_courses ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.academy_competences ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.academy_awards ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.sessions;
DROP SEQUENCE IF EXISTS public.reflections_id_seq;
DROP TABLE IF EXISTS public.reflections;
DROP SEQUENCE IF EXISTS public.personal_access_tokens_id_seq;
DROP TABLE IF EXISTS public.personal_access_tokens;
DROP SEQUENCE IF EXISTS public.payment_savings_id_seq;
DROP TABLE IF EXISTS public.payment_savings;
DROP SEQUENCE IF EXISTS public.payment_items_id_seq;
DROP TABLE IF EXISTS public.payment_items;
DROP SEQUENCE IF EXISTS public.payment_discounts_id_seq;
DROP TABLE IF EXISTS public.payment_discounts;
DROP SEQUENCE IF EXISTS public.payment_billings_id_seq;
DROP TABLE IF EXISTS public.payment_billings;
DROP TABLE IF EXISTS public.password_reset_tokens;
DROP TABLE IF EXISTS public.oauth_refresh_tokens;
DROP SEQUENCE IF EXISTS public.oauth_personal_access_clients_id_seq;
DROP TABLE IF EXISTS public.oauth_personal_access_clients;
DROP SEQUENCE IF EXISTS public.oauth_clients_id_seq;
DROP TABLE IF EXISTS public.oauth_clients;
DROP TABLE IF EXISTS public.oauth_auth_codes;
DROP TABLE IF EXISTS public.oauth_access_tokens;
DROP TABLE IF EXISTS public.notifications;
DROP SEQUENCE IF EXISTS public.migrations_id_seq;
DROP TABLE IF EXISTS public.migrations;
DROP SEQUENCE IF EXISTS public.media_tasks_id_seq;
DROP TABLE IF EXISTS public.media_tasks;
DROP SEQUENCE IF EXISTS public.media_task_likes_id_seq;
DROP TABLE IF EXISTS public.media_task_likes;
DROP SEQUENCE IF EXISTS public.media_task_collaborators_id_seq;
DROP TABLE IF EXISTS public.media_task_collaborators;
DROP SEQUENCE IF EXISTS public.media_projects_id_seq;
DROP TABLE IF EXISTS public.media_projects;
DROP SEQUENCE IF EXISTS public.media_project_participants_id_seq;
DROP TABLE IF EXISTS public.media_project_participants;
DROP SEQUENCE IF EXISTS public.media_notifications_id_seq;
DROP TABLE IF EXISTS public.media_notifications;
DROP SEQUENCE IF EXISTS public.media_comments_id_seq;
DROP TABLE IF EXISTS public.media_comments;
DROP SEQUENCE IF EXISTS public.media_blogs_id_seq;
DROP TABLE IF EXISTS public.media_blogs;
DROP SEQUENCE IF EXISTS public.media_blog_likes_id_seq;
DROP TABLE IF EXISTS public.media_blog_likes;
DROP SEQUENCE IF EXISTS public.media_blog_comments_id_seq;
DROP TABLE IF EXISTS public.media_blog_comments;
DROP SEQUENCE IF EXISTS public.finance_items_id_seq;
DROP TABLE IF EXISTS public.finance_items;
DROP SEQUENCE IF EXISTS public.finance_deposits_id_seq;
DROP TABLE IF EXISTS public.finance_deposits;
DROP SEQUENCE IF EXISTS public.finance_accounts_id_seq;
DROP TABLE IF EXISTS public.finance_accounts;
DROP SEQUENCE IF EXISTS public.failed_jobs_id_seq;
DROP TABLE IF EXISTS public.failed_jobs;
DROP SEQUENCE IF EXISTS public.emails_id_seq;
DROP TABLE IF EXISTS public.emails;
DROP SEQUENCE IF EXISTS public.email_accounts_id_seq;
DROP TABLE IF EXISTS public.email_accounts;
DROP SEQUENCE IF EXISTS public.developer_api_keys_id_seq;
DROP TABLE IF EXISTS public.developer_api_keys;
DROP SEQUENCE IF EXISTS public.api_request_logs_id_seq;
DROP TABLE IF EXISTS public.api_request_logs;
DROP SEQUENCE IF EXISTS public.admin_teachers_id_seq;
DROP TABLE IF EXISTS public.admin_teachers;
DROP SEQUENCE IF EXISTS public.admin_students_id_seq;
DROP TABLE IF EXISTS public.admin_students;
DROP SEQUENCE IF EXISTS public.admin_schools_id_seq;
DROP TABLE IF EXISTS public.admin_schools;
DROP SEQUENCE IF EXISTS public.admin_events_id_seq;
DROP TABLE IF EXISTS public.admin_events;
DROP SEQUENCE IF EXISTS public.academy_subjects_id_seq;
DROP TABLE IF EXISTS public.academy_subjects;
DROP SEQUENCE IF EXISTS public.academy_scores_id_seq;
DROP TABLE IF EXISTS public.academy_scores;
DROP SEQUENCE IF EXISTS public.academy_courses_id_seq;
DROP TABLE IF EXISTS public.academy_courses;
DROP SEQUENCE IF EXISTS public.academy_competences_id_seq;
DROP TABLE IF EXISTS public.academy_competences;
DROP SEQUENCE IF EXISTS public.academy_awards_id_seq;
DROP TABLE IF EXISTS public.academy_awards;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: academy_awards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.academy_awards (
    id bigint NOT NULL,
    date character varying(255) NOT NULL,
    admin_student_id bigint NOT NULL,
    semester integer NOT NULL,
    academy_subject_id bigint NOT NULL,
    item character varying(255) NOT NULL,
    rate integer NOT NULL,
    result character varying(255) NOT NULL,
    admin_teacher_id bigint NOT NULL,
    remark character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: academy_awards_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.academy_awards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: academy_awards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.academy_awards_id_seq OWNED BY public.academy_awards.id;


--
-- Name: academy_competences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.academy_competences (
    id bigint NOT NULL,
    academy_subject_id bigint NOT NULL,
    semester integer NOT NULL,
    admin_teacher_id bigint NOT NULL,
    competence_1 text,
    competence_2 text,
    competence_3 text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: academy_competences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.academy_competences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: academy_competences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.academy_competences_id_seq OWNED BY public.academy_competences.id;


--
-- Name: academy_courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.academy_courses (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    subject character varying(255) NOT NULL,
    note character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    section character varying(255) NOT NULL,
    description text,
    video_url character varying(255),
    video_duration character varying(255) DEFAULT '00.00'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: academy_courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.academy_courses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: academy_courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.academy_courses_id_seq OWNED BY public.academy_courses.id;


--
-- Name: academy_scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.academy_scores (
    id bigint NOT NULL,
    serial character varying(255) NOT NULL,
    admin_student_id bigint NOT NULL,
    semester integer NOT NULL,
    academy_competence_id bigint NOT NULL,
    month_1 integer,
    month_2 integer,
    month_3 integer,
    month_4 integer,
    month_5 integer,
    month_6 integer,
    final_score integer DEFAULT 0,
    is_ok_1 boolean DEFAULT false NOT NULL,
    competence_1 text,
    is_ok_2 boolean DEFAULT false NOT NULL,
    competence_2 text,
    is_ok_3 boolean DEFAULT false NOT NULL,
    competence_3 text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: academy_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.academy_scores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: academy_scores_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.academy_scores_id_seq OWNED BY public.academy_scores.id;


--
-- Name: academy_subjects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.academy_subjects (
    id bigint NOT NULL,
    number character varying(255) NOT NULL,
    "group" character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: academy_subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.academy_subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: academy_subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.academy_subjects_id_seq OWNED BY public.academy_subjects.id;


--
-- Name: admin_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_events (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    start_date date NOT NULL,
    end_date date NOT NULL,
    remark character varying(255) NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: admin_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_events_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_events_id_seq OWNED BY public.admin_events.id;


--
-- Name: admin_schools; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_schools (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    nickname character varying(255),
    npsn integer,
    organization character varying(255),
    permit character varying(255),
    address character varying(255),
    map character varying(255),
    phone character varying(255),
    email character varying(255),
    motto character varying(255),
    period integer,
    head character varying(255),
    contact character varying(255),
    notes character varying(255),
    logo character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: admin_schools_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_schools_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_schools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_schools_id_seq OWNED BY public.admin_schools.id;


--
-- Name: admin_students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_students (
    id bigint NOT NULL,
    nis integer NOT NULL,
    name character varying(255) NOT NULL,
    nickname character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    rumble character varying(255),
    birth_place character varying(255),
    birth_date date,
    address character varying(255),
    hamlet character varying(255),
    village character varying(255),
    district character varying(255),
    city character varying(255),
    postal_code integer,
    hobby character varying(255),
    sport character varying(255),
    ambition character varying(255),
    role character varying(255),
    skills character varying(255),
    own_phone character varying(255),
    email character varying(255),
    instagram character varying(255),
    father character varying(255),
    father_birth date,
    father_note character varying(255),
    mother character varying(255),
    mother_birth date,
    mother_note character varying(255),
    phone character varying(255),
    job character varying(255),
    income character varying(255),
    image character varying(255),
    payment_category character varying(255),
    registered integer DEFAULT 0 NOT NULL,
    graduation integer,
    next_school character varying(255),
    next_school_address character varying(255),
    note text,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: admin_students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_students_id_seq OWNED BY public.admin_students.id;


--
-- Name: admin_teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_teachers (
    id bigint NOT NULL,
    nig integer NOT NULL,
    name character varying(255) NOT NULL,
    nickname character varying(255) NOT NULL,
    gender character varying(255) NOT NULL,
    status character varying(255) DEFAULT 'Active'::character varying NOT NULL,
    birth_place character varying(255),
    birth_date date,
    address character varying(255),
    hamlet character varying(255),
    village character varying(255),
    district character varying(255),
    city character varying(255),
    postal_code character varying(255),
    phone character varying(255),
    registered integer DEFAULT 0 NOT NULL,
    grade integer DEFAULT 1 NOT NULL,
    resign integer DEFAULT 1 NOT NULL,
    update_job character varying(255),
    image character varying(255),
    note character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT admin_teachers_status_check CHECK (((status)::text = ANY ((ARRAY['Active'::character varying, 'On Duty'::character varying, 'Passive'::character varying, 'Suspend'::character varying])::text[])))
);


--
-- Name: admin_teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_teachers_id_seq OWNED BY public.admin_teachers.id;


--
-- Name: api_request_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.api_request_logs (
    id bigint NOT NULL,
    api_key_id bigint,
    user_id bigint,
    tier character varying(20) NOT NULL,
    method character varying(10) NOT NULL,
    endpoint character varying(255) NOT NULL,
    status_code smallint NOT NULL,
    duration_ms integer DEFAULT 0 NOT NULL,
    ip_address character varying(45),
    user_agent text,
    request_id character varying(36),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: api_request_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.api_request_logs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: api_request_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.api_request_logs_id_seq OWNED BY public.api_request_logs.id;


--
-- Name: developer_api_keys; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.developer_api_keys (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    key_prefix character varying(16) NOT NULL,
    key_hash character varying(64) NOT NULL,
    scopes json,
    tier character varying(255) DEFAULT 'standard'::character varying NOT NULL,
    rate_limit_per_minute integer DEFAULT 120 NOT NULL,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: developer_api_keys_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.developer_api_keys_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: developer_api_keys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.developer_api_keys_id_seq OWNED BY public.developer_api_keys.id;


--
-- Name: email_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_accounts (
    id bigint NOT NULL,
    user_id bigint NOT NULL,
    email character varying(255) NOT NULL,
    imap_host character varying(255),
    imap_port integer,
    encryption character varying(255) DEFAULT 'ssl'::character varying NOT NULL,
    smtp_host character varying(255),
    smtp_port integer,
    password text NOT NULL,
    quota_mb integer DEFAULT 1000 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: email_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.email_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: email_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.email_accounts_id_seq OWNED BY public.email_accounts.id;


--
-- Name: emails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.emails (
    id bigint NOT NULL,
    email_account_id bigint NOT NULL,
    uid character varying(255) NOT NULL,
    folder character varying(255) NOT NULL,
    subject character varying(255),
    "from" character varying(255),
    "to" character varying(255),
    body text,
    is_read boolean DEFAULT false NOT NULL,
    has_attachment boolean DEFAULT false NOT NULL,
    received_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: emails_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.emails_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: emails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.emails_id_seq OWNED BY public.emails.id;


--
-- Name: failed_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.failed_jobs (
    id bigint NOT NULL,
    uuid character varying(255) NOT NULL,
    connection text NOT NULL,
    queue text NOT NULL,
    payload text NOT NULL,
    exception text NOT NULL,
    failed_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.failed_jobs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.failed_jobs_id_seq OWNED BY public.failed_jobs.id;


--
-- Name: finance_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.finance_accounts (
    id bigint NOT NULL,
    number integer NOT NULL,
    unit character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    detail character varying(255),
    allocation integer DEFAULT 0 NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: finance_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.finance_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: finance_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.finance_accounts_id_seq OWNED BY public.finance_accounts.id;


--
-- Name: finance_deposits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.finance_deposits (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    amount integer NOT NULL,
    icon character varying(255),
    color character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: finance_deposits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.finance_deposits_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: finance_deposits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.finance_deposits_id_seq OWNED BY public.finance_deposits.id;


--
-- Name: finance_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.finance_items (
    id bigint NOT NULL,
    invoice character varying(255) NOT NULL,
    date date NOT NULL,
    vendor character varying(255) NOT NULL,
    finance_account_id bigint NOT NULL,
    remark character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    amount integer NOT NULL,
    admin character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: finance_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.finance_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: finance_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.finance_items_id_seq OWNED BY public.finance_items.id;


--
-- Name: media_blog_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_blog_comments (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    media_blog_id bigint NOT NULL,
    user_id bigint NOT NULL,
    content text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_blog_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_blog_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_blog_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_blog_comments_id_seq OWNED BY public.media_blog_comments.id;


--
-- Name: media_blog_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_blog_likes (
    id bigint NOT NULL,
    media_blog_id bigint NOT NULL,
    user_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_blog_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_blog_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_blog_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_blog_likes_id_seq OWNED BY public.media_blog_likes.id;


--
-- Name: media_blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_blogs (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    title character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    excerpt text NOT NULL,
    content text NOT NULL,
    image character varying(255),
    category character varying(255) NOT NULL,
    date character varying(255),
    read_time character varying(255),
    likes integer DEFAULT 0 NOT NULL,
    rating numeric(3,2) DEFAULT 4.9 NOT NULL,
    reviews_count integer DEFAULT 0 NOT NULL,
    user_id bigint,
    author_name character varying(255),
    author_avatar character varying(255),
    status character varying(255) DEFAULT 'PUBLISHED'::character varying NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_blogs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_blogs_id_seq OWNED BY public.media_blogs.id;


--
-- Name: media_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_comments (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    media_task_id bigint NOT NULL,
    user_id bigint NOT NULL,
    content text NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_comments_id_seq OWNED BY public.media_comments.id;


--
-- Name: media_notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_notifications (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    recipient_id bigint NOT NULL,
    sender_id bigint,
    type character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    message text NOT NULL,
    link character varying(255),
    is_read boolean DEFAULT false NOT NULL,
    related_id character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_notifications_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_notifications_id_seq OWNED BY public.media_notifications.id;


--
-- Name: media_project_participants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_project_participants (
    id bigint NOT NULL,
    media_project_id bigint NOT NULL,
    user_id bigint,
    admin_student_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_project_participants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_project_participants_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_project_participants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_project_participants_id_seq OWNED BY public.media_project_participants.id;


--
-- Name: media_projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_projects (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    title character varying(255) NOT NULL,
    description text NOT NULL,
    status character varying(255) DEFAULT 'active'::character varying NOT NULL,
    mentor_id bigint,
    admin_teacher_id bigint,
    project_manager_id bigint,
    creator_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_projects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_projects_id_seq OWNED BY public.media_projects.id;


--
-- Name: media_task_collaborators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_task_collaborators (
    id bigint NOT NULL,
    media_task_id bigint NOT NULL,
    user_id bigint,
    admin_student_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_task_collaborators_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_task_collaborators_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_task_collaborators_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_task_collaborators_id_seq OWNED BY public.media_task_collaborators.id;


--
-- Name: media_task_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_task_likes (
    id bigint NOT NULL,
    media_task_id bigint NOT NULL,
    user_id bigint,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_task_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_task_likes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_task_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_task_likes_id_seq OWNED BY public.media_task_likes.id;


--
-- Name: media_tasks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media_tasks (
    id bigint NOT NULL,
    mongodb_id character varying(36),
    media_project_id bigint NOT NULL,
    user_id bigint,
    admin_student_id bigint,
    admin_teacher_id bigint,
    media_url text,
    media_urls json,
    media_type character varying(255) DEFAULT 'image'::character varying NOT NULL,
    caption text,
    status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    mentor_id bigint,
    grade numeric(5,2),
    review_comment text,
    reviewed_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: media_tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_tasks_id_seq OWNED BY public.media_tasks.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    migration character varying(255) NOT NULL,
    batch integer NOT NULL
);


--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id uuid NOT NULL,
    type character varying(255) NOT NULL,
    notifiable_type character varying(255) NOT NULL,
    notifiable_id bigint NOT NULL,
    data text NOT NULL,
    read_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: oauth_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_access_tokens (
    id character varying(100) NOT NULL,
    user_id bigint,
    client_id bigint NOT NULL,
    name character varying(255),
    scopes text,
    revoked boolean NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone
);


--
-- Name: oauth_auth_codes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_auth_codes (
    id character varying(100) NOT NULL,
    user_id bigint NOT NULL,
    client_id bigint NOT NULL,
    scopes text,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);


--
-- Name: oauth_clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_clients (
    id bigint NOT NULL,
    user_id bigint,
    name character varying(255) NOT NULL,
    secret character varying(100),
    provider character varying(255),
    redirect text NOT NULL,
    personal_access_client boolean NOT NULL,
    password_client boolean NOT NULL,
    revoked boolean NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: oauth_clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.oauth_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.oauth_clients_id_seq OWNED BY public.oauth_clients.id;


--
-- Name: oauth_personal_access_clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_personal_access_clients (
    id bigint NOT NULL,
    client_id bigint NOT NULL,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: oauth_personal_access_clients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.oauth_personal_access_clients_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: oauth_personal_access_clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.oauth_personal_access_clients_id_seq OWNED BY public.oauth_personal_access_clients.id;


--
-- Name: oauth_refresh_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.oauth_refresh_tokens (
    id character varying(100) NOT NULL,
    access_token_id character varying(100) NOT NULL,
    revoked boolean NOT NULL,
    expires_at timestamp(0) without time zone
);


--
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.password_reset_tokens (
    email character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    created_at timestamp(0) without time zone
);


--
-- Name: payment_billings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_billings (
    id bigint NOT NULL,
    year integer NOT NULL,
    category character varying(255) NOT NULL,
    finance_account_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    is_once boolean DEFAULT false NOT NULL,
    is_monthly boolean DEFAULT false NOT NULL,
    note character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: payment_billings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_billings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_billings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_billings_id_seq OWNED BY public.payment_billings.id;


--
-- Name: payment_discounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_discounts (
    id bigint NOT NULL,
    admin_student_id bigint NOT NULL,
    year integer NOT NULL,
    finance_account_id bigint,
    billing character varying(255) NOT NULL,
    amount integer DEFAULT 0 NOT NULL,
    note character varying(255),
    admin character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: payment_discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_discounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_discounts_id_seq OWNED BY public.payment_discounts.id;


--
-- Name: payment_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_items (
    id bigint NOT NULL,
    invoice character varying(255) NOT NULL,
    date date NOT NULL,
    period integer DEFAULT 2026 NOT NULL,
    admin_student_id bigint NOT NULL,
    finance_account_id bigint,
    billing character varying(255) NOT NULL,
    amount integer NOT NULL,
    is_once boolean DEFAULT false NOT NULL,
    is_monthly boolean DEFAULT false NOT NULL,
    admin character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: payment_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_items_id_seq OWNED BY public.payment_items.id;


--
-- Name: payment_savings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payment_savings (
    id bigint NOT NULL,
    invoice character varying(255) NOT NULL,
    date date NOT NULL,
    admin_student_id bigint NOT NULL,
    credit integer DEFAULT 0 NOT NULL,
    debit integer DEFAULT 0 NOT NULL,
    note character varying(255),
    admin character varying(255),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: payment_savings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payment_savings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payment_savings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payment_savings_id_seq OWNED BY public.payment_savings.id;


--
-- Name: personal_access_tokens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personal_access_tokens (
    id bigint NOT NULL,
    tokenable_type character varying(255) NOT NULL,
    tokenable_id bigint NOT NULL,
    name character varying(255) NOT NULL,
    token character varying(64) NOT NULL,
    abilities text,
    last_used_at timestamp(0) without time zone,
    expires_at timestamp(0) without time zone,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.personal_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.personal_access_tokens_id_seq OWNED BY public.personal_access_tokens.id;


--
-- Name: reflections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reflections (
    id bigint NOT NULL,
    user_id bigint,
    admin_student_id bigint,
    date date NOT NULL,
    achievement jsonb,
    obstacles jsonb,
    lessons jsonb,
    priority jsonb,
    health jsonb,
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone
);


--
-- Name: reflections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reflections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reflections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reflections_id_seq OWNED BY public.reflections.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id character varying(255) NOT NULL,
    user_id bigint,
    ip_address character varying(45),
    user_agent text,
    payload text NOT NULL,
    last_activity integer NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    admin_student_id bigint,
    admin_teacher_id bigint,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    email_verified_at timestamp(0) without time zone,
    password character varying(255) NOT NULL,
    role integer DEFAULT 0 NOT NULL,
    access character varying(255),
    image character varying(255),
    email_provisioned_at timestamp(0) without time zone,
    email_status character varying(255) DEFAULT 'pending'::character varying NOT NULL,
    mongodb_id character varying(36),
    username character varying(255),
    bio text,
    skills json,
    instagram_id character varying(255),
    media_role character varying(255) DEFAULT 'member'::character varying NOT NULL,
    remember_token character varying(100),
    created_at timestamp(0) without time zone,
    updated_at timestamp(0) without time zone,
    CONSTRAINT users_email_status_check CHECK (((email_status)::text = ANY ((ARRAY['pending'::character varying, 'active'::character varying, 'failed'::character varying])::text[])))
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: academy_awards id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_awards ALTER COLUMN id SET DEFAULT nextval('public.academy_awards_id_seq'::regclass);


--
-- Name: academy_competences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_competences ALTER COLUMN id SET DEFAULT nextval('public.academy_competences_id_seq'::regclass);


--
-- Name: academy_courses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_courses ALTER COLUMN id SET DEFAULT nextval('public.academy_courses_id_seq'::regclass);


--
-- Name: academy_scores id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_scores ALTER COLUMN id SET DEFAULT nextval('public.academy_scores_id_seq'::regclass);


--
-- Name: academy_subjects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_subjects ALTER COLUMN id SET DEFAULT nextval('public.academy_subjects_id_seq'::regclass);


--
-- Name: admin_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_events ALTER COLUMN id SET DEFAULT nextval('public.admin_events_id_seq'::regclass);


--
-- Name: admin_schools id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_schools ALTER COLUMN id SET DEFAULT nextval('public.admin_schools_id_seq'::regclass);


--
-- Name: admin_students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_students ALTER COLUMN id SET DEFAULT nextval('public.admin_students_id_seq'::regclass);


--
-- Name: admin_teachers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_teachers ALTER COLUMN id SET DEFAULT nextval('public.admin_teachers_id_seq'::regclass);


--
-- Name: api_request_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_request_logs ALTER COLUMN id SET DEFAULT nextval('public.api_request_logs_id_seq'::regclass);


--
-- Name: developer_api_keys id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developer_api_keys ALTER COLUMN id SET DEFAULT nextval('public.developer_api_keys_id_seq'::regclass);


--
-- Name: email_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_accounts ALTER COLUMN id SET DEFAULT nextval('public.email_accounts_id_seq'::regclass);


--
-- Name: emails id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.emails ALTER COLUMN id SET DEFAULT nextval('public.emails_id_seq'::regclass);


--
-- Name: failed_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs ALTER COLUMN id SET DEFAULT nextval('public.failed_jobs_id_seq'::regclass);


--
-- Name: finance_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_accounts ALTER COLUMN id SET DEFAULT nextval('public.finance_accounts_id_seq'::regclass);


--
-- Name: finance_deposits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_deposits ALTER COLUMN id SET DEFAULT nextval('public.finance_deposits_id_seq'::regclass);


--
-- Name: finance_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_items ALTER COLUMN id SET DEFAULT nextval('public.finance_items_id_seq'::regclass);


--
-- Name: media_blog_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_comments ALTER COLUMN id SET DEFAULT nextval('public.media_blog_comments_id_seq'::regclass);


--
-- Name: media_blog_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_likes ALTER COLUMN id SET DEFAULT nextval('public.media_blog_likes_id_seq'::regclass);


--
-- Name: media_blogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blogs ALTER COLUMN id SET DEFAULT nextval('public.media_blogs_id_seq'::regclass);


--
-- Name: media_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_comments ALTER COLUMN id SET DEFAULT nextval('public.media_comments_id_seq'::regclass);


--
-- Name: media_notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_notifications ALTER COLUMN id SET DEFAULT nextval('public.media_notifications_id_seq'::regclass);


--
-- Name: media_project_participants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_project_participants ALTER COLUMN id SET DEFAULT nextval('public.media_project_participants_id_seq'::regclass);


--
-- Name: media_projects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects ALTER COLUMN id SET DEFAULT nextval('public.media_projects_id_seq'::regclass);


--
-- Name: media_task_collaborators id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_collaborators ALTER COLUMN id SET DEFAULT nextval('public.media_task_collaborators_id_seq'::regclass);


--
-- Name: media_task_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_likes ALTER COLUMN id SET DEFAULT nextval('public.media_task_likes_id_seq'::regclass);


--
-- Name: media_tasks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks ALTER COLUMN id SET DEFAULT nextval('public.media_tasks_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: oauth_clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_clients_id_seq'::regclass);


--
-- Name: oauth_personal_access_clients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_personal_access_clients ALTER COLUMN id SET DEFAULT nextval('public.oauth_personal_access_clients_id_seq'::regclass);


--
-- Name: payment_billings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_billings ALTER COLUMN id SET DEFAULT nextval('public.payment_billings_id_seq'::regclass);


--
-- Name: payment_discounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_discounts ALTER COLUMN id SET DEFAULT nextval('public.payment_discounts_id_seq'::regclass);


--
-- Name: payment_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_items ALTER COLUMN id SET DEFAULT nextval('public.payment_items_id_seq'::regclass);


--
-- Name: payment_savings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_savings ALTER COLUMN id SET DEFAULT nextval('public.payment_savings_id_seq'::regclass);


--
-- Name: personal_access_tokens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.personal_access_tokens_id_seq'::regclass);


--
-- Name: reflections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections ALTER COLUMN id SET DEFAULT nextval('public.reflections_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: academy_awards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.academy_awards (id, date, admin_student_id, semester, academy_subject_id, item, rate, result, admin_teacher_id, remark, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: academy_competences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.academy_competences (id, academy_subject_id, semester, admin_teacher_id, competence_1, competence_2, competence_3, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: academy_courses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.academy_courses (id, name, subject, note, author, title, section, description, video_url, video_duration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: academy_scores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.academy_scores (id, serial, admin_student_id, semester, academy_competence_id, month_1, month_2, month_3, month_4, month_5, month_6, final_score, is_ok_1, competence_1, is_ok_2, competence_2, is_ok_3, competence_3, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: academy_subjects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.academy_subjects (id, number, "group", name, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: admin_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_events (id, title, description, start_date, end_date, remark, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: admin_schools; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_schools (id, name, nickname, npsn, organization, permit, address, map, phone, email, motto, period, head, contact, notes, logo, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: admin_students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_students (id, nis, name, nickname, gender, rumble, birth_place, birth_date, address, hamlet, village, district, city, postal_code, hobby, sport, ambition, role, skills, own_phone, email, instagram, father, father_birth, father_note, mother, mother_birth, mother_note, phone, job, income, image, payment_category, registered, graduation, next_school, next_school_address, note, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: admin_teachers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_teachers (id, nig, name, nickname, gender, status, birth_place, birth_date, address, hamlet, village, district, city, postal_code, phone, registered, grade, resign, update_job, image, note, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: api_request_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.api_request_logs (id, api_key_id, user_id, tier, method, endpoint, status_code, duration_ms, ip_address, user_agent, request_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: developer_api_keys; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.developer_api_keys (id, user_id, name, key_prefix, key_hash, scopes, tier, rate_limit_per_minute, last_used_at, expires_at, is_active, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: email_accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_accounts (id, user_id, email, imap_host, imap_port, encryption, smtp_host, smtp_port, password, quota_mb, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: emails; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.emails (id, email_account_id, uid, folder, subject, "from", "to", body, is_read, has_attachment, received_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: failed_jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.failed_jobs (id, uuid, connection, queue, payload, exception, failed_at) FROM stdin;
\.


--
-- Data for Name: finance_accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.finance_accounts (id, number, unit, description, detail, allocation, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: finance_deposits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.finance_deposits (id, title, amount, icon, color, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: finance_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.finance_items (id, invoice, date, vendor, finance_account_id, remark, description, amount, admin, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_blog_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_blog_comments (id, mongodb_id, media_blog_id, user_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_blog_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_blog_likes (id, media_blog_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_blogs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_blogs (id, mongodb_id, title, slug, excerpt, content, image, category, date, read_time, likes, rating, reviews_count, user_id, author_name, author_avatar, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_comments (id, mongodb_id, media_task_id, user_id, content, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_notifications (id, mongodb_id, recipient_id, sender_id, type, title, message, link, is_read, related_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_project_participants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_project_participants (id, media_project_id, user_id, admin_student_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_projects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_projects (id, mongodb_id, title, description, status, mentor_id, admin_teacher_id, project_manager_id, creator_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_task_collaborators; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_task_collaborators (id, media_task_id, user_id, admin_student_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_task_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_task_likes (id, media_task_id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: media_tasks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media_tasks (id, mongodb_id, media_project_id, user_id, admin_student_id, admin_teacher_id, media_url, media_urls, media_type, caption, status, mentor_id, grade, review_comment, reviewed_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.migrations (id, migration, batch) FROM stdin;
1	2014_10_12_000000_create_users_table	1
2	2016_06_01_000001_create_oauth_auth_codes_table	1
3	2016_06_01_000002_create_oauth_access_tokens_table	1
4	2016_06_01_000003_create_oauth_refresh_tokens_table	1
5	2016_06_01_000004_create_oauth_clients_table	1
6	2016_06_01_000005_create_oauth_personal_access_clients_table	1
7	2019_08_19_000000_create_failed_jobs_table	1
8	2019_12_14_000001_create_personal_access_tokens_table	1
9	2024_11_08_103112_create_admin_students_table	1
10	2024_11_09_100133_create_admin_teachers_table	1
11	2024_11_09_103039_create_admin_schools_table	1
12	2024_11_09_104500_create_admin_events_table	1
13	2024_11_15_023939_create_academy_courses_table	1
14	2024_11_15_032836_create_academy_awards_table	1
15	2024_11_15_041038_create_academy_subjects_table	1
16	2024_11_15_121704_create_academy_competences_table	1
17	2024_11_15_132933_create_academy_scores_table	1
18	2024_11_15_142143_create_finance_accounts_table	1
19	2024_11_15_143936_create_finance_items_table	1
20	2024_11_15_151102_create_payment_billings_table	1
21	2024_11_15_153221_create_payment_discounts_table	1
22	2024_11_15_155130_create_payment_items_table	1
23	2024_11_15_161217_create_payment_savings_table	1
24	2025_08_18_043021_create_notifications_table	1
25	2025_09_18_001751_create_finance_deposits_table	1
26	2026_08_25_080339_create_email_accounts_table	1
27	2026_08_25_080339_create_emails_table	1
28	2026_09_08_000002_create_media_projects_table	1
29	2026_09_08_000003_create_media_tasks_table	1
30	2026_09_08_000004_create_media_comments_table	1
31	2026_09_08_000005_create_media_blogs_table	1
32	2026_09_08_000006_create_media_blog_comments_table	1
33	2026_09_08_000007_create_media_notifications_table	1
34	2026_09_10_000001_create_reflections_table	1
35	2026_09_14_150001_create_developer_api_keys_table	1
36	2026_09_14_150002_create_api_request_logs_table	1
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, type, notifiable_type, notifiable_id, data, read_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.oauth_access_tokens (id, user_id, client_id, name, scopes, revoked, created_at, updated_at, expires_at) FROM stdin;
\.


--
-- Data for Name: oauth_auth_codes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.oauth_auth_codes (id, user_id, client_id, scopes, revoked, expires_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.oauth_clients (id, user_id, name, secret, provider, redirect, personal_access_client, password_client, revoked, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_personal_access_clients; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.oauth_personal_access_clients (id, client_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: oauth_refresh_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.oauth_refresh_tokens (id, access_token_id, revoked, expires_at) FROM stdin;
\.


--
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.password_reset_tokens (email, token, created_at) FROM stdin;
\.


--
-- Data for Name: payment_billings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_billings (id, year, category, finance_account_id, name, amount, is_once, is_monthly, note, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_discounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_discounts (id, admin_student_id, year, finance_account_id, billing, amount, note, admin, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_items (id, invoice, date, period, admin_student_id, finance_account_id, billing, amount, is_once, is_monthly, admin, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: payment_savings; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payment_savings (id, invoice, date, admin_student_id, credit, debit, note, admin, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: personal_access_tokens; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.personal_access_tokens (id, tokenable_type, tokenable_id, name, token, abilities, last_used_at, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: reflections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reflections (id, user_id, admin_student_id, date, achievement, obstacles, lessons, priority, health, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, user_id, ip_address, user_agent, payload, last_activity) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, admin_student_id, admin_teacher_id, name, email, email_verified_at, password, role, access, image, email_provisioned_at, email_status, mongodb_id, username, bio, skills, instagram_id, media_role, remember_token, created_at, updated_at) FROM stdin;
\.


--
-- Name: academy_awards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.academy_awards_id_seq', 1, false);


--
-- Name: academy_competences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.academy_competences_id_seq', 1, false);


--
-- Name: academy_courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.academy_courses_id_seq', 1, false);


--
-- Name: academy_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.academy_scores_id_seq', 1, false);


--
-- Name: academy_subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.academy_subjects_id_seq', 1, false);


--
-- Name: admin_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_events_id_seq', 1, false);


--
-- Name: admin_schools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_schools_id_seq', 1, false);


--
-- Name: admin_students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_students_id_seq', 1, false);


--
-- Name: admin_teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_teachers_id_seq', 1, false);


--
-- Name: api_request_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.api_request_logs_id_seq', 1, false);


--
-- Name: developer_api_keys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.developer_api_keys_id_seq', 1, false);


--
-- Name: email_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.email_accounts_id_seq', 1, false);


--
-- Name: emails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.emails_id_seq', 1, false);


--
-- Name: failed_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.failed_jobs_id_seq', 1, false);


--
-- Name: finance_accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.finance_accounts_id_seq', 1, false);


--
-- Name: finance_deposits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.finance_deposits_id_seq', 1, false);


--
-- Name: finance_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.finance_items_id_seq', 1, false);


--
-- Name: media_blog_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_blog_comments_id_seq', 1, false);


--
-- Name: media_blog_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_blog_likes_id_seq', 1, false);


--
-- Name: media_blogs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_blogs_id_seq', 1, false);


--
-- Name: media_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_comments_id_seq', 1, false);


--
-- Name: media_notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_notifications_id_seq', 1, false);


--
-- Name: media_project_participants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_project_participants_id_seq', 1, false);


--
-- Name: media_projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_projects_id_seq', 1, false);


--
-- Name: media_task_collaborators_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_task_collaborators_id_seq', 1, false);


--
-- Name: media_task_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_task_likes_id_seq', 1, false);


--
-- Name: media_tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_tasks_id_seq', 1, false);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.migrations_id_seq', 36, true);


--
-- Name: oauth_clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.oauth_clients_id_seq', 1, false);


--
-- Name: oauth_personal_access_clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.oauth_personal_access_clients_id_seq', 1, false);


--
-- Name: payment_billings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_billings_id_seq', 1, false);


--
-- Name: payment_discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_discounts_id_seq', 1, false);


--
-- Name: payment_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_items_id_seq', 1, false);


--
-- Name: payment_savings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payment_savings_id_seq', 1, false);


--
-- Name: personal_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.personal_access_tokens_id_seq', 1, false);


--
-- Name: reflections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reflections_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: academy_awards academy_awards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_awards
    ADD CONSTRAINT academy_awards_pkey PRIMARY KEY (id);


--
-- Name: academy_competences academy_competences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_competences
    ADD CONSTRAINT academy_competences_pkey PRIMARY KEY (id);


--
-- Name: academy_courses academy_courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_courses
    ADD CONSTRAINT academy_courses_pkey PRIMARY KEY (id);


--
-- Name: academy_scores academy_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_scores
    ADD CONSTRAINT academy_scores_pkey PRIMARY KEY (id);


--
-- Name: academy_subjects academy_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_subjects
    ADD CONSTRAINT academy_subjects_pkey PRIMARY KEY (id);


--
-- Name: admin_events admin_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_events
    ADD CONSTRAINT admin_events_pkey PRIMARY KEY (id);


--
-- Name: admin_schools admin_schools_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_schools
    ADD CONSTRAINT admin_schools_pkey PRIMARY KEY (id);


--
-- Name: admin_students admin_students_nis_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_students
    ADD CONSTRAINT admin_students_nis_unique UNIQUE (nis);


--
-- Name: admin_students admin_students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_students
    ADD CONSTRAINT admin_students_pkey PRIMARY KEY (id);


--
-- Name: admin_teachers admin_teachers_nig_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_teachers
    ADD CONSTRAINT admin_teachers_nig_unique UNIQUE (nig);


--
-- Name: admin_teachers admin_teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_teachers
    ADD CONSTRAINT admin_teachers_pkey PRIMARY KEY (id);


--
-- Name: api_request_logs api_request_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_request_logs
    ADD CONSTRAINT api_request_logs_pkey PRIMARY KEY (id);


--
-- Name: developer_api_keys developer_api_keys_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developer_api_keys
    ADD CONSTRAINT developer_api_keys_pkey PRIMARY KEY (id);


--
-- Name: email_accounts email_accounts_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_accounts
    ADD CONSTRAINT email_accounts_email_unique UNIQUE (email);


--
-- Name: email_accounts email_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_accounts
    ADD CONSTRAINT email_accounts_pkey PRIMARY KEY (id);


--
-- Name: emails emails_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_pkey PRIMARY KEY (id);


--
-- Name: failed_jobs failed_jobs_uuid_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.failed_jobs
    ADD CONSTRAINT failed_jobs_uuid_unique UNIQUE (uuid);


--
-- Name: finance_accounts finance_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_accounts
    ADD CONSTRAINT finance_accounts_pkey PRIMARY KEY (id);


--
-- Name: finance_deposits finance_deposits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_deposits
    ADD CONSTRAINT finance_deposits_pkey PRIMARY KEY (id);


--
-- Name: finance_items finance_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_items
    ADD CONSTRAINT finance_items_pkey PRIMARY KEY (id);


--
-- Name: media_blog_comments media_blog_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_comments
    ADD CONSTRAINT media_blog_comments_pkey PRIMARY KEY (id);


--
-- Name: media_blog_likes media_blog_likes_media_blog_id_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_likes
    ADD CONSTRAINT media_blog_likes_media_blog_id_user_id_unique UNIQUE (media_blog_id, user_id);


--
-- Name: media_blog_likes media_blog_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_likes
    ADD CONSTRAINT media_blog_likes_pkey PRIMARY KEY (id);


--
-- Name: media_blogs media_blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blogs
    ADD CONSTRAINT media_blogs_pkey PRIMARY KEY (id);


--
-- Name: media_blogs media_blogs_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blogs
    ADD CONSTRAINT media_blogs_slug_unique UNIQUE (slug);


--
-- Name: media_comments media_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_comments
    ADD CONSTRAINT media_comments_pkey PRIMARY KEY (id);


--
-- Name: media_notifications media_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_notifications
    ADD CONSTRAINT media_notifications_pkey PRIMARY KEY (id);


--
-- Name: media_project_participants media_project_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_project_participants
    ADD CONSTRAINT media_project_participants_pkey PRIMARY KEY (id);


--
-- Name: media_projects media_projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects
    ADD CONSTRAINT media_projects_pkey PRIMARY KEY (id);


--
-- Name: media_task_collaborators media_task_collaborators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_collaborators
    ADD CONSTRAINT media_task_collaborators_pkey PRIMARY KEY (id);


--
-- Name: media_task_likes media_task_likes_media_task_id_user_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_likes
    ADD CONSTRAINT media_task_likes_media_task_id_user_id_unique UNIQUE (media_task_id, user_id);


--
-- Name: media_task_likes media_task_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_likes
    ADD CONSTRAINT media_task_likes_pkey PRIMARY KEY (id);


--
-- Name: media_tasks media_tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: oauth_access_tokens oauth_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_access_tokens
    ADD CONSTRAINT oauth_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: oauth_auth_codes oauth_auth_codes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_auth_codes
    ADD CONSTRAINT oauth_auth_codes_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_personal_access_clients oauth_personal_access_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_personal_access_clients
    ADD CONSTRAINT oauth_personal_access_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_refresh_tokens oauth_refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.oauth_refresh_tokens
    ADD CONSTRAINT oauth_refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (email);


--
-- Name: payment_billings payment_billings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_billings
    ADD CONSTRAINT payment_billings_pkey PRIMARY KEY (id);


--
-- Name: payment_discounts payment_discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_discounts
    ADD CONSTRAINT payment_discounts_pkey PRIMARY KEY (id);


--
-- Name: payment_items payment_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_items
    ADD CONSTRAINT payment_items_pkey PRIMARY KEY (id);


--
-- Name: payment_savings payment_savings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_savings
    ADD CONSTRAINT payment_savings_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: personal_access_tokens personal_access_tokens_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personal_access_tokens
    ADD CONSTRAINT personal_access_tokens_token_unique UNIQUE (token);


--
-- Name: reflections reflections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_instagram_id_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_instagram_id_unique UNIQUE (instagram_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: api_request_logs_endpoint_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_request_logs_endpoint_index ON public.api_request_logs USING btree (endpoint);


--
-- Name: api_request_logs_request_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_request_logs_request_id_index ON public.api_request_logs USING btree (request_id);


--
-- Name: api_request_logs_status_code_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_request_logs_status_code_index ON public.api_request_logs USING btree (status_code);


--
-- Name: api_request_logs_tier_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX api_request_logs_tier_index ON public.api_request_logs USING btree (tier);


--
-- Name: developer_api_keys_key_hash_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX developer_api_keys_key_hash_index ON public.developer_api_keys USING btree (key_hash);


--
-- Name: developer_api_keys_key_prefix_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX developer_api_keys_key_prefix_index ON public.developer_api_keys USING btree (key_prefix);


--
-- Name: emails_folder_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX emails_folder_index ON public.emails USING btree (folder);


--
-- Name: emails_uid_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX emails_uid_index ON public.emails USING btree (uid);


--
-- Name: media_blog_comments_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_blog_comments_mongodb_id_index ON public.media_blog_comments USING btree (mongodb_id);


--
-- Name: media_blogs_category_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_blogs_category_index ON public.media_blogs USING btree (category);


--
-- Name: media_blogs_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_blogs_mongodb_id_index ON public.media_blogs USING btree (mongodb_id);


--
-- Name: media_comments_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_comments_mongodb_id_index ON public.media_comments USING btree (mongodb_id);


--
-- Name: media_notifications_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_notifications_mongodb_id_index ON public.media_notifications USING btree (mongodb_id);


--
-- Name: media_project_participants_media_project_id_admin_student_id_in; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_project_participants_media_project_id_admin_student_id_in ON public.media_project_participants USING btree (media_project_id, admin_student_id);


--
-- Name: media_projects_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_projects_mongodb_id_index ON public.media_projects USING btree (mongodb_id);


--
-- Name: media_task_collaborators_media_task_id_admin_student_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_task_collaborators_media_task_id_admin_student_id_index ON public.media_task_collaborators USING btree (media_task_id, admin_student_id);


--
-- Name: media_tasks_admin_student_id_status_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_tasks_admin_student_id_status_index ON public.media_tasks USING btree (admin_student_id, status);


--
-- Name: media_tasks_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_tasks_mongodb_id_index ON public.media_tasks USING btree (mongodb_id);


--
-- Name: notifications_notifiable_type_notifiable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX notifications_notifiable_type_notifiable_id_index ON public.notifications USING btree (notifiable_type, notifiable_id);


--
-- Name: oauth_access_tokens_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_access_tokens_user_id_index ON public.oauth_access_tokens USING btree (user_id);


--
-- Name: oauth_auth_codes_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_auth_codes_user_id_index ON public.oauth_auth_codes USING btree (user_id);


--
-- Name: oauth_clients_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_clients_user_id_index ON public.oauth_clients USING btree (user_id);


--
-- Name: oauth_refresh_tokens_access_token_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX oauth_refresh_tokens_access_token_id_index ON public.oauth_refresh_tokens USING btree (access_token_id);


--
-- Name: personal_access_tokens_tokenable_type_tokenable_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX personal_access_tokens_tokenable_type_tokenable_id_index ON public.personal_access_tokens USING btree (tokenable_type, tokenable_id);


--
-- Name: reflections_admin_student_id_date_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reflections_admin_student_id_date_index ON public.reflections USING btree (admin_student_id, date);


--
-- Name: reflections_user_id_date_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reflections_user_id_date_index ON public.reflections USING btree (user_id, date);


--
-- Name: sessions_last_activity_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_last_activity_index ON public.sessions USING btree (last_activity);


--
-- Name: sessions_user_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX sessions_user_id_index ON public.sessions USING btree (user_id);


--
-- Name: users_mongodb_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_mongodb_id_index ON public.users USING btree (mongodb_id);


--
-- Name: academy_awards academy_awards_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_awards
    ADD CONSTRAINT academy_awards_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: academy_competences academy_competences_academy_subject_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_competences
    ADD CONSTRAINT academy_competences_academy_subject_id_foreign FOREIGN KEY (academy_subject_id) REFERENCES public.academy_subjects(id) ON DELETE CASCADE;


--
-- Name: academy_competences academy_competences_admin_teacher_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_competences
    ADD CONSTRAINT academy_competences_admin_teacher_id_foreign FOREIGN KEY (admin_teacher_id) REFERENCES public.admin_teachers(id) ON DELETE CASCADE;


--
-- Name: academy_scores academy_scores_academy_competence_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_scores
    ADD CONSTRAINT academy_scores_academy_competence_id_foreign FOREIGN KEY (academy_competence_id) REFERENCES public.academy_competences(id) ON DELETE CASCADE;


--
-- Name: academy_scores academy_scores_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.academy_scores
    ADD CONSTRAINT academy_scores_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: api_request_logs api_request_logs_api_key_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_request_logs
    ADD CONSTRAINT api_request_logs_api_key_id_foreign FOREIGN KEY (api_key_id) REFERENCES public.developer_api_keys(id) ON DELETE SET NULL;


--
-- Name: api_request_logs api_request_logs_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.api_request_logs
    ADD CONSTRAINT api_request_logs_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: developer_api_keys developer_api_keys_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.developer_api_keys
    ADD CONSTRAINT developer_api_keys_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: email_accounts email_accounts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_accounts
    ADD CONSTRAINT email_accounts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: emails emails_email_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.emails
    ADD CONSTRAINT emails_email_account_id_foreign FOREIGN KEY (email_account_id) REFERENCES public.email_accounts(id) ON DELETE CASCADE;


--
-- Name: finance_items finance_items_finance_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.finance_items
    ADD CONSTRAINT finance_items_finance_account_id_foreign FOREIGN KEY (finance_account_id) REFERENCES public.finance_accounts(id) ON DELETE CASCADE;


--
-- Name: media_blog_comments media_blog_comments_media_blog_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_comments
    ADD CONSTRAINT media_blog_comments_media_blog_id_foreign FOREIGN KEY (media_blog_id) REFERENCES public.media_blogs(id) ON DELETE CASCADE;


--
-- Name: media_blog_comments media_blog_comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_comments
    ADD CONSTRAINT media_blog_comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: media_blog_likes media_blog_likes_media_blog_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_likes
    ADD CONSTRAINT media_blog_likes_media_blog_id_foreign FOREIGN KEY (media_blog_id) REFERENCES public.media_blogs(id) ON DELETE CASCADE;


--
-- Name: media_blog_likes media_blog_likes_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blog_likes
    ADD CONSTRAINT media_blog_likes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: media_blogs media_blogs_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_blogs
    ADD CONSTRAINT media_blogs_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_comments media_comments_media_task_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_comments
    ADD CONSTRAINT media_comments_media_task_id_foreign FOREIGN KEY (media_task_id) REFERENCES public.media_tasks(id) ON DELETE CASCADE;


--
-- Name: media_comments media_comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_comments
    ADD CONSTRAINT media_comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: media_notifications media_notifications_recipient_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_notifications
    ADD CONSTRAINT media_notifications_recipient_id_foreign FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: media_notifications media_notifications_sender_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_notifications
    ADD CONSTRAINT media_notifications_sender_id_foreign FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_project_participants media_project_participants_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_project_participants
    ADD CONSTRAINT media_project_participants_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: media_project_participants media_project_participants_media_project_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_project_participants
    ADD CONSTRAINT media_project_participants_media_project_id_foreign FOREIGN KEY (media_project_id) REFERENCES public.media_projects(id) ON DELETE CASCADE;


--
-- Name: media_project_participants media_project_participants_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_project_participants
    ADD CONSTRAINT media_project_participants_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_projects media_projects_admin_teacher_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects
    ADD CONSTRAINT media_projects_admin_teacher_id_foreign FOREIGN KEY (admin_teacher_id) REFERENCES public.admin_teachers(id) ON DELETE SET NULL;


--
-- Name: media_projects media_projects_creator_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects
    ADD CONSTRAINT media_projects_creator_id_foreign FOREIGN KEY (creator_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_projects media_projects_mentor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects
    ADD CONSTRAINT media_projects_mentor_id_foreign FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_projects media_projects_project_manager_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_projects
    ADD CONSTRAINT media_projects_project_manager_id_foreign FOREIGN KEY (project_manager_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_task_collaborators media_task_collaborators_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_collaborators
    ADD CONSTRAINT media_task_collaborators_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: media_task_collaborators media_task_collaborators_media_task_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_collaborators
    ADD CONSTRAINT media_task_collaborators_media_task_id_foreign FOREIGN KEY (media_task_id) REFERENCES public.media_tasks(id) ON DELETE CASCADE;


--
-- Name: media_task_collaborators media_task_collaborators_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_collaborators
    ADD CONSTRAINT media_task_collaborators_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_task_likes media_task_likes_media_task_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_likes
    ADD CONSTRAINT media_task_likes_media_task_id_foreign FOREIGN KEY (media_task_id) REFERENCES public.media_tasks(id) ON DELETE CASCADE;


--
-- Name: media_task_likes media_task_likes_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_task_likes
    ADD CONSTRAINT media_task_likes_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: media_tasks media_tasks_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: media_tasks media_tasks_admin_teacher_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_admin_teacher_id_foreign FOREIGN KEY (admin_teacher_id) REFERENCES public.admin_teachers(id) ON DELETE SET NULL;


--
-- Name: media_tasks media_tasks_media_project_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_media_project_id_foreign FOREIGN KEY (media_project_id) REFERENCES public.media_projects(id) ON DELETE CASCADE;


--
-- Name: media_tasks media_tasks_mentor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_mentor_id_foreign FOREIGN KEY (mentor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: media_tasks media_tasks_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media_tasks
    ADD CONSTRAINT media_tasks_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: payment_billings payment_billings_finance_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_billings
    ADD CONSTRAINT payment_billings_finance_account_id_foreign FOREIGN KEY (finance_account_id) REFERENCES public.finance_accounts(id) ON DELETE CASCADE;


--
-- Name: payment_discounts payment_discounts_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_discounts
    ADD CONSTRAINT payment_discounts_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: payment_discounts payment_discounts_finance_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_discounts
    ADD CONSTRAINT payment_discounts_finance_account_id_foreign FOREIGN KEY (finance_account_id) REFERENCES public.finance_accounts(id) ON DELETE CASCADE;


--
-- Name: payment_items payment_items_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_items
    ADD CONSTRAINT payment_items_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: payment_items payment_items_finance_account_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_items
    ADD CONSTRAINT payment_items_finance_account_id_foreign FOREIGN KEY (finance_account_id) REFERENCES public.finance_accounts(id) ON DELETE CASCADE;


--
-- Name: payment_savings payment_savings_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payment_savings
    ADD CONSTRAINT payment_savings_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: reflections reflections_admin_student_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_admin_student_id_foreign FOREIGN KEY (admin_student_id) REFERENCES public.admin_students(id) ON DELETE CASCADE;


--
-- Name: reflections reflections_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reflections
    ADD CONSTRAINT reflections_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict SCnH20McFqRhskV7XZSfSsLz8GbzCykHeE5tz1W4leBtjIr8iNZlJKubcZJgs4z

