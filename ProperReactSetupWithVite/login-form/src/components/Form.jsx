import { useState } from 'react';

import './Form.css';

export function Form() {
    const [showPassword, setShowPassword] = useState(false);

    function switchShow() {
        showPassword ? setShowPassword(false) : setShowPassword(true);
    }

    return (
        <div className="form-container">
            <div>
                <input
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                />
                <button
                    onClick={switchShow}
                >Show</button>
            </div>
            <div>
                <button>Login</button>
                <button>Sign up</button>
            </div>
        </div>
    );
}