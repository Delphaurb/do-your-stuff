import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const noteColors = [
    '#ffcdd2', // Red 100
    '#f8bbd0', // Pink 100
    '#e1bee7', // Purple 100
    '#d1c4e9', // Deep Purple 100
    '#c5cae9', // Indigo 100
    '#bbdefb', // Blue 100
    '#b3e5fc', // Light Blue 100
    '#b2dfdb', // Teal 100
    '#c8e6c9', // Green 100
    '#dcedc8', // Light Green 100
    '#f0f4c3', // Lime 100
    '#fff9c4', // Yellow 100
    '#ffecb3', // Amber 100
    '#ffe0b2', // Orange 100
    '#ffccbc', // Deep Orange 100
    '#d7ccc8', // Brown 100
    '#f5f5f5', // Grey 100
    '#cfd8dc'  // Blue Grey 100
];

export const DataProvider = ({ children }) => {
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem('notes');
        if (saved) return JSON.parse(saved);

        // Default notes for new users
        return [
            {
                id: 1,
                type: 'checklist',
                title: 'Morning Routine',
                items: [
                    { id: 1, text: 'Drink water', checked: false },
                    { id: 2, text: 'Stretch', checked: false },
                    { id: 3, text: 'Plan the day', checked: false }
                ],
                color: '#fff9c4' // Default Light Yellow
            },
            {
                id: 2,
                type: 'habit',
                title: 'Weekly Habits',
                habits: [
                    { id: 1, text: 'Read 30 mins', days: [0, 0, 0, 0, 0, 0, 0] },
                    { id: 2, text: 'Exercise', days: [0, 0, 0, 0, 0, 0, 0] }
                ],
                color: '#c8e6c9' // Default Light Green
            },
            {
                id: 3,
                type: 'longterm',
                title: 'Life Goals',
                tasks: [
                    { id: 1, text: 'Learn Spanish', description: 'Practice 15 mins daily on Duolingo' },
                    { id: 2, text: 'Visit Japan', description: 'Save $5000 by 2026' }
                ],
                color: '#bbdefb' // Default Light Blue
            }
        ];
    });

    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem('events');
        return saved ? JSON.parse(saved) : [];
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('transactions');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    // Random Light Color Generator
    const getRandomLightColor = () => {
        return noteColors[Math.floor(Math.random() * noteColors.length)];
    };

    const addNote = (note) => {
        setNotes([...notes, { ...note, id: Date.now(), color: getRandomLightColor() }]);
    };

    const updateNote = (id, updatedFields) => {
        setNotes(notes.map(note => note.id === id ? { ...note, ...updatedFields } : note));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const addEvent = (event) => {
        setEvents([...events, event]);
    };

    const updateEvent = (id, updatedFields) => {
        setEvents(events.map(event => event.id === id ? { ...event, ...updatedFields } : event));
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    const addTransaction = (transaction) => {
        setTransactions([...transactions, transaction]);
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    return (
        <DataContext.Provider value={{
            notes, setNotes, addNote, updateNote, deleteNote,
            events, addEvent, updateEvent, deleteEvent,
            transactions, addTransaction, deleteTransaction,
            getRandomLightColor, noteColors
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);
