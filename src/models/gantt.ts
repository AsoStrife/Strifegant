export enum Language {
    English = 'en',
    Spanish = 'es',
    Italian = 'it',
    Russian = 'ru',
    PortugueseBrazil = 'ptBr',
    French = 'fr',
    Turkish = 'tr',
    Chinese = 'zh',
    German = 'de',
    Hungarian = 'hu'
}

export enum ViewMode {
    QuarterDay = 'Quarter Day',
    HalfDay = 'Half Day',
    Day = 'Day',
    Week = 'Week',
    Month = 'Month'
}

export interface Task {
    id: string;
    name: string;
    start: string;
    end: string;
    progress: number;
    dependencies: string[];
}

export interface GanttConfig {
    header_height: number;
    column_width: number;
    step: number;
    view_modes: ViewMode;
    bar_height: number;
    bar_corner_radius: number;
    arrow_curve: number;
    padding: number;
    view_mode: string;
    date_format: string;
    language: Language;
    custom_popup_html: string | null;
}