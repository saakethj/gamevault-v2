import LightRays from '../../components/external/LightRays';
import { FlipText } from '../../components/UI/FlipText';

const Login = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">

            {/* Left Light Rays */}
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
                    className="custom-rays"
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
                    className="custom-rays"
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-md mx-auto">

                {/* Heading Section with FlipText */}
                <div className="text-center mb-12">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <FlipText
                            className="text-white"
                            duration={0.6}
                            delayMultiple={0.1}
                        >
                            Welcome Back, PLAYER
                        </FlipText>
                    </div>
                    <p className="text-lg md:text-xl text-gray-300">
                        Sign in to your GameVault
                    </p>
                </div>

                {/* Form Container with Lorem Ipsum */}
                <div className="rounded-xl p-8 border border-gray-800/30 backdrop-blur-sm">
                    <div className="text-gray-300 text-sm leading-relaxed">
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <p className="mb-4">
                            Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                        </p>
                        <p>
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;