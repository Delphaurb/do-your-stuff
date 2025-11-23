import React from 'react';
import { useTheme } from '../context/ThemeContext';

function Settings() {
    const { theme, changeTheme, themes, boardSkin, setBoardSkin } = useTheme();

    const skins = [
        { id: 'none', name: 'None', color: '#e0e0e0' },
        { id: 'ocean', name: 'Ocean Waves', color: '#2196f3' },
        { id: 'galaxy', name: 'Galaxy', color: '#673ab7' },
    ];

    return (
        <div style={{ padding: '40px', paddingTop: '100px', backgroundColor: theme.colors.background, minHeight: '100vh', color: theme.colors.text, fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ color: theme.colors.text, marginBottom: '10px', fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>Settings</h1>
                <p style={{ color: theme.colors.text, opacity: 0.7, marginBottom: '40px', fontSize: '1.1rem' }}>Customize your workspace appearance.</p>

                {/* Themes */}
                <div style={{ marginTop: '20px', marginBottom: '60px' }}>
                    <h3 style={{ borderBottom: `1px solid rgba(0,0,0,0.1)`, paddingBottom: '15px', marginBottom: '25px', fontSize: '1.5rem', fontWeight: '600' }}>Theme Selection</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                        gap: '24px',
                    }}>
                        {Object.values(themes).map((t) => (
                            <button
                                key={t.id}
                                onClick={() => changeTheme(t.id)}
                                style={{
                                    padding: '24px',
                                    backgroundColor: t.colors.surface,
                                    color: t.colors.text,
                                    border: theme.id === t.id ? `2px solid ${theme.colors.accent}` : '1px solid rgba(0,0,0,0.05)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '16px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: theme.id === t.id ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
                                    transform: theme.id === t.id ? 'translateY(-4px)' : 'none'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: t.colors.primary,
                                    border: '4px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                                }}></div>
                                <span style={{ fontWeight: '600', fontSize: '1rem' }}>{t.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Board Skins */}
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ borderBottom: `1px solid rgba(0,0,0,0.1)`, paddingBottom: '15px', marginBottom: '25px', fontSize: '1.5rem', fontWeight: '600' }}>Board Skins</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '24px',
                    }}>
                        {skins.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setBoardSkin(s.id)}
                                style={{
                                    padding: '0',
                                    backgroundColor: theme.colors.surface,
                                    color: theme.colors.text,
                                    border: boardSkin === s.id ? `3px solid ${theme.colors.accent}` : 'none',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    height: '120px',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease',
                                    boxShadow: boardSkin === s.id ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.1)',
                                    transform: boardSkin === s.id ? 'scale(1.02)' : 'none'
                                }}
                            >
                                {/* Background Preview */}
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    background: s.id === 'none' ? '#eee' : s.color,
                                    backgroundImage: s.id === 'vines' ? 'linear-gradient(45deg, #4caf50 25%, transparent 25%, transparent 75%, #4caf50 75%, #4caf50), linear-gradient(45deg, #4caf50 25%, transparent 25%, transparent 75%, #4caf50 75%, #4caf50)' :
                                        s.id === 'ocean' ? 'linear-gradient(0deg, #2196f3 0%, #bbdefb 100%)' :
                                            s.id === 'sunset' ? 'linear-gradient(180deg, #ff9800 0%, #f44336 100%)' :
                                                s.id === 'galaxy' ? 'radial-gradient(circle, #673ab7 0%, #000 100%)' : 'none',
                                    backgroundSize: s.id === 'vines' ? '20px 20px' : 'cover',
                                }}></div>

                                {/* Name Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    backgroundColor: 'rgba(0,0,0,0.2)', // Slight tint for readability
                                    backdropFilter: s.id === 'none' ? 'none' : 'blur(1px)',
                                    transition: 'background-color 0.2s'
                                }}>
                                    <span style={{
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        color: '#fff',
                                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {s.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Settings;
