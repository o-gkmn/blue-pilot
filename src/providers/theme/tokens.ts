import { vars } from "nativewind";

export type ThemeVariants = "system" | "dark" | "light";

// prettier-ignore
export const themesVariables = {
    light: {
        '--background':           '#FDF6EE',   // warm off-white
        '--foreground':           '#1a0f05',   // near-black warm
        '--primary':              '#bb7125',   // your main orange-brown
        '--primary-foreground':   '#ffffff',
        '--secondary':            '#4b3317',   // deep brown
        '--secondary-foreground': '#FDF6EE',
        '--accent':               '#d4924a',   // lighter warm gold
        '--accent-foreground':    '#1a0f05',

        '--danger':               '#c0392b',
        '--warning':              '#e67e22',
        '--info':                 '#051230',   // your deep navy as info
        '--success':              '#27ae60',

        '--border':               '#d9b99a',
        '--overlay':              '#05123066',

        '--text-primary':         '#1a0f05',
        '--text-secondary':       '#4b3317',
        '--text-accent':          '#bb7125',
        '--text-success':         '#1e7e45',
        '--text-disabled':        '#b09070',
        '--text-placeholder':     '#c4a882',
        '--text-inverse':         '#FDF6EE',
    },
    dark: {
        '--background':           '#051230',   // your deep navy
        '--foreground':           '#f5ede0',   // warm cream
        '--primary':              '#bb7125',   // same — holds well on dark
        '--primary-foreground':   '#ffffff',
        '--secondary':            '#4b3317',
        '--secondary-foreground': '#f5ede0',
        '--accent':               '#d4924a',
        '--accent-foreground':    '#051230',

        '--danger':               '#e55347',
        '--warning':              '#f39c12',
        '--info':                 '#4a6fa5',   // lighter navy for readability
        '--success':              '#2ecc71',

        '--border':               '#1e2d50',
        '--overlay':              '#00000099',

        '--text-primary':         '#f5ede0',
        '--text-secondary':       '#c4a882',
        '--text-accent':          '#d4924a',
        '--text-success':         '#2ecc71',
        '--text-disabled':        '#3a4a6b',
        '--text-placeholder':     '#2a3a5a',
        '--text-inverse':         '#051230',
    }
}

export const themes = {
  light: vars(themesVariables.light),
  dark: vars(themesVariables.dark),
};
