import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { FaUtensils, FaFilm, FaUser, FaMoneyBillWave, FaShoppingBasket, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

function Finance() {
    const { theme } = useTheme();
    const { transactions, addTransaction, deleteTransaction } = useData();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [type, setType] = useState('debit'); // debit (expense) or credit (income)
    const [category, setCategory] = useState('food');

    const categories = {
        food: { icon: FaUtensils, color: '#ff9800', label: 'Food' },
        entertainment: { icon: FaFilm, color: '#9c27b0', label: 'Entertainment' },
        personal: { icon: FaUser, color: '#2196f3', label: 'Personal' },
        debt: { icon: FaMoneyBillWave, color: '#f44336', label: 'Debt' },
        essentials: { icon: FaShoppingBasket, color: '#4caf50', label: 'Essentials' },
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!title || !amount) return;

        addTransaction({
            id: Date.now(),
            title,
            amount: parseFloat(amount),
            date,
            type,
            category
        });

        setTitle('');
        setAmount('');
    };

    // Monthly Summary Calculation
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());

    const monthlyExpenses = transactions
        .filter(t => t.type === 'debit' && isWithinInterval(parseISO(t.date), { start: currentMonthStart, end: currentMonthEnd }))
        .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = transactions
        .filter(t => t.type === 'credit' && isWithinInterval(parseISO(t.date), { start: currentMonthStart, end: currentMonthEnd }))
        .reduce((sum, t) => sum + t.amount, 0);

    const inputStyle = {
        width: '100%',
        padding: '14px',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.08)',
        background: 'rgba(255,255,255,0.8)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        outline: 'none',
        color: theme.colors.text,
        transition: 'border-color 0.2s, box-shadow 0.2s'
    };

    return (
        <div style={{ padding: '40px', paddingTop: '100px', backgroundColor: theme.colors.background, minHeight: '100vh', color: theme.colors.text, fontFamily: 'Inter, sans-serif' }}>
            <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
        }
        input[type="date"] {
            position: relative;
        }
      `}</style>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>

                {/* Header & Summary */}
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px', letterSpacing: '-1px' }}>Finance Tracker</h1>

                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <div style={{
                            flex: 1,
                            backgroundColor: theme.colors.surface,
                            padding: '24px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: '600' }}>Monthly Expenses</span>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f44336' }}>
                                ${monthlyExpenses.toFixed(2)}
                            </div>
                        </div>
                        <div style={{
                            flex: 1,
                            backgroundColor: theme.colors.surface,
                            padding: '24px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <span style={{ fontSize: '0.9rem', opacity: 0.7, fontWeight: '600' }}>Monthly Income</span>
                            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#4caf50' }}>
                                ${monthlyIncome.toFixed(2)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Transaction Form */}
                <form onSubmit={handleAdd} style={{
                    backgroundColor: theme.colors.surface,
                    padding: '30px',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                    marginBottom: '40px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    alignItems: 'flex-end',
                    border: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div style={{ flex: 2, minWidth: '200px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="e.g. Grocery Shopping"
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = theme.colors.primary}
                            onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(e.target.value)}
                            placeholder="0.00"
                            style={inputStyle}
                            onFocus={e => e.target.style.borderColor = theme.colors.primary}
                            onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Date</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                style={{ ...inputStyle, cursor: 'pointer', paddingRight: '40px' }}
                                onFocus={e => e.target.style.borderColor = theme.colors.primary}
                                onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
                            />
                            <FaCalendarAlt style={{
                                position: 'absolute',
                                right: '14px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: theme.colors.primary,
                                pointerEvents: 'none'
                            }} />
                        </div>
                    </div>
                    <div style={{ flex: 1, minWidth: '140px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Type</label>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '12px auto', paddingRight: '30px' }}
                            onFocus={e => e.target.style.borderColor = theme.colors.primary}
                            onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
                        >
                            <option value="debit">Expense</option>
                            <option value="credit">Income</option>
                        </select>
                    </div>
                    <div style={{ flex: 1, minWidth: '160px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.85rem', opacity: 0.8 }}>Category</label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px top 50%', backgroundSize: '12px auto', paddingRight: '30px' }}
                            onFocus={e => e.target.style.borderColor = theme.colors.primary}
                            onBlur={e => e.target.style.borderColor = 'rgba(0,0,0,0.08)'}
                        >
                            {Object.entries(categories).map(([key, val]) => (
                                <option key={key} value={key}>{val.label}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '14px 28px', borderRadius: '12px', border: 'none',
                            backgroundColor: theme.colors.primary, color: '#fff', fontWeight: '600',
                            cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', height: '50px',
                            transition: 'transform 0.1s'
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Add
                    </button>
                </form>

                {/* Transaction List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {transactions.map(t => {
                        const CatIcon = categories[t.category]?.icon || FaShoppingBasket;
                        const catColor = categories[t.category]?.color || '#999';

                        return (
                            <div key={t.id} style={{
                                backgroundColor: theme.colors.surface,
                                padding: '20px',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                                transition: 'transform 0.2s',
                                border: '1px solid rgba(0,0,0,0.02)'
                            }}
                                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: '12px',
                                        backgroundColor: `${catColor}20`, color: catColor,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        <CatIcon />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px' }}>{t.title}</div>
                                        <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>{format(parseISO(t.date), 'MMM d, yyyy')} • {categories[t.category]?.label}</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{
                                        fontWeight: '700',
                                        fontSize: '1.2rem',
                                        color: t.type === 'debit' ? '#f44336' : '#4caf50',
                                        display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                        {t.type === 'debit' ? '-' : '+'}${t.amount.toFixed(2)}
                                    </div>
                                    <button
                                        onClick={() => deleteTransaction(t.id)}
                                        style={{
                                            background: 'transparent', border: 'none', color: theme.colors.text,
                                            opacity: 0.3, cursor: 'pointer', padding: '8px'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.opacity = 1}
                                        onMouseOut={e => e.currentTarget.style.opacity = 0.3}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {transactions.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px', opacity: 0.5 }}>No transactions yet.</div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Finance;
