import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, Edit3, Check, X, Settings } from 'lucide-react';

function SettingsPage({ theme, setTheme, addEvent, title, setTitle, date, setDate, themeAccents, themes, goBack }) {
  const exampleEvent = {
    title: 'Example Event',
    date: '2024-10-15'
  };

  const getElapsedTime = (dateString) => {
    const start = new Date(dateString);
    const end = new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  };

  const { years, months, days, totalDays } = getElapsedTime(exampleEvent.date);
  const dropdownClass = `border rounded px-3 py-2 shadow-sm ${theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-black'}`;

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center transition-colors duration-300 ${themes[theme]}`}>
      <h1 className="text-3xl font-bold mb-6 text-current">Settings</h1>

      <div className="flex flex-col gap-2 mb-6 w-full max-w-md">
        <label htmlFor="theme" className="font-semibold text-lg text-current">Select Theme:</label>
        <select
          id="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className={dropdownClass}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="ocean">Ocean</option>
          <option value="sunset">Sunset</option>
          <option value="forest">Forest</option>
        </select>
      </div>

      <Card className={`w-full max-w-md p-4 shadow-md rounded-xl mb-6 border-l-4 ${themeAccents[theme]} bg-white bg-opacity-90 dark:bg-gray-700 dark:text-gray-100`}>
        <CardContent className="p-0">
          <p className="text-lg font-semibold text-current">{exampleEvent.title}</p>
          <p className="opacity-90 text-current">{totalDays} days since {new Date(exampleEvent.date).toLocaleDateString()}</p>
          <p className="text-sm opacity-80 text-current">({years} years, {months} months, {days} days)</p>
        </CardContent>
      </Card>

      <div className="flex gap-2 mb-6 w-full max-w-md">
        <Input
          type="text"
          placeholder="Event title (e.g. Moved into new house)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={addEvent} className={`flex items-center gap-1 font-semibold ${themeAccents[theme]}`}>
          <PlusCircle size={18} /> Add
        </Button>
      </div>

      <Button onClick={goBack} className={`font-semibold mt-auto ${themeAccents[theme]}`}>Back</Button>
    </div>
  );
}

export default function DaysSince() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [theme, setTheme] = useState('light');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [isSettings, setIsSettings] = useState(false);

  const themes = {
    light: 'bg-gray-50 text-gray-900 accent-blue-500',
    dark: 'bg-gray-900 text-gray-100 accent-yellow-400',
    ocean: 'bg-blue-50 text-blue-900 accent-blue-600',
    sunset: 'bg-orange-50 text-orange-900 accent-pink-500',
    forest: 'bg-green-50 text-green-900 accent-green-600'
  };

  const themeAccents = {
    light: 'border-blue-400 text-blue-500 hover:text-blue-600',
    dark: 'border-yellow-400 text-yellow-400 hover:text-yellow-300',
    ocean: 'border-blue-500 text-blue-600 hover:text-blue-700',
    sunset: 'border-pink-500 text-pink-500 hover:text-pink-600',
    forest: 'border-green-600 text-green-600 hover:text-green-700'
  };

  useEffect(() => {
    const savedEvents = localStorage.getItem('daysSinceEvents');
    const savedTheme = localStorage.getItem('daysSinceTheme');
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('daysSinceEvents', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('daysSinceTheme', theme);
  }, [theme]);

  const addEvent = () => {
    if (!title || !date) return;
    const newEvent = { id: Date.now(), title, date };
    setEvents([...events, newEvent]);
    setTitle('');
    setDate('');
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const startEditing = (event) => {
    setEditingId(event.id);
    setEditTitle(event.title);
    setEditDate(event.date);
  };

  const saveEdit = (id) => {
    setEvents(events.map(e => e.id === id ? { ...e, title: editTitle, date: editDate } : e));
    setEditingId(null);
    setEditTitle('');
    setEditDate('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDate('');
  };

  const getElapsedTime = (dateString) => {
    const start = new Date(dateString);
    const end = new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const totalDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  };

  if (isSettings) {
    return <SettingsPage theme={theme} setTheme={setTheme} addEvent={addEvent} title={title} setTitle={setTitle} date={date} setDate={setDate} themeAccents={themeAccents} themes={themes} goBack={() => setIsSettings(false)} />;
  }

  return (
    <div className={`min-h-screen p-6 flex flex-col items-center transition-colors duration-300 ${themes[theme]}`}>
      <h1 className="text-4xl font-bold mb-8">Days Since</h1>

      <div className="grid gap-4 w-full max-w-md">
        {events.length === 0 && (
          <p className="opacity-75 text-center">No events yet. Add one in settings!</p>
        )}

        {events.map((event) => {
          const { years, months, days, totalDays } = getElapsedTime(event.date);
          const isEditing = editingId === event.id;

          return (
            <Card
              key={event.id}
              className={`flex justify-between items-center p-4 shadow-md rounded-xl transition-colors duration-300 bg-white bg-opacity-90 dark:bg-gray-700 dark:text-gray-100 border-l-4 ${themeAccents[theme]}`}
            >
              <CardContent className="p-0 flex-1">
                {isEditing ? (
                  <div className="flex flex-col gap-2">
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                    <Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                  </div>
                ) : (
                  <>
                    <p className="text-lg font-semibold">{event.title}</p>
                    <p className="opacity-90">
                      {totalDays} days since {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm opacity-80">
                      ({years} years, {months} months, {days} days)
                    </p>
                  </>
                )}
              </CardContent>

              <div className="flex gap-2 ml-2">
                {isEditing ? (
                  <>
                    <Button variant="ghost" onClick={() => saveEdit(event.id)} className={`${themeAccents[theme]}`}>
                      <Check />
                    </Button>
                    <Button variant="ghost" onClick={cancelEdit} className={`${themeAccents[theme]}`}>
                      <X />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => startEditing(event)} className={`${themeAccents[theme]}`}>
                      <Edit3 />
                    </Button>
                    <Button variant="ghost" onClick={() => deleteEvent(event.id)} className={`${themeAccents[theme]}`}>
                      <Trash2 />
                    </Button>
                  </>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Button onClick={() => setIsSettings(true)} className={`mt-auto font-semibold flex items-center gap-2 ${themeAccents[theme]}`}>
        <Settings /> Settings
      </Button>
    </div>
  );
}
