import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { sendMessage } from '../../services/firebase';
import './styles.css';

function MessageInput({ roomId }) {
    const { user } = useAuth();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, user, value);
        setValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="message-input-container">
            <input
                type="text"
                placeholder="Danos tu opinion"
                value={value}
                onChange={handleChange}
                className="message-input"
                required
                minLength={1}
            />
            <button type="submit" disabled={value < 1} className="send-message">
                Envia
            </button>
        </form>
    );
}
export { MessageInput };