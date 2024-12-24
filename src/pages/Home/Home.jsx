import Button from "../../components/Elements/Button";
import {useNavigate} from "react-router-dom";
import {useAuth} from '../../context/AuthContext';

const Home = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    return (
        <div className="flex flex-col space-y-4 items-center h-screen justify-center border">
            <div className="flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                        Welcome!
                    </h1>
                    <h3>
                        This is the Home Page.
                    </h3>
                </div>
                <div className="space-x-2">
                    {isAuthenticated ?
                        <Button size="medium" color="blue" text="Profile" onClick={() => navigate('/dashboard')}/>
                        :
                        <Button size="medium" color="blue" text="Log In" onClick={() => navigate('/login')}/>
                    }
                </div>
            </div>
        </div>
    );
};

export {Home};
