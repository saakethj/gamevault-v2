import LightRays from '../../components/external/LightRays';
import { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">

            {/* Light Rays Background */}
            <div className="absolute inset-0 z-0">
                <LightRays
                    raysOrigin="right"
                    raysColor="#f0abfc"
                    raysSpeed={0.5}
                    lightSpread={1.5}
                    rayLength={1.8}
                    pulsating={false}
                    fadeDistance={1.5}
                    saturation={0.8}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.08}
                    distortion={0.03}
                />
            </div>

            <div className="absolute inset-0 z-1 mix-blend-screen">
                <LightRays
                    raysOrigin="left"
                    raysColor="#9F00FF"
                    raysSpeed={1.0}
                    lightSpread={1.5}
                    rayLength={1.5}
                    pulsating={false}
                    fadeDistance={1.5}
                    saturation={0.5}
                    followMouse={true}
                    mouseInfluence={0.15}
                    noiseAmount={0.08}
                    distortion={0.03}
                />
            </div>

        </div>
    );
};

export default Login;