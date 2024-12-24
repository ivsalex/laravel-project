import Button from "../../components/Elements/Button";
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col space-y-4 items-center h-screen justify-center border">
            <div
                className="flex flex-col justify-center items-center space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                    Nothing to search here :)
                </h1>
                <Button size="medium" color="blue" text="Take me back!" onClick={() => navigate('/')} />
            </div>
        </div>
    );
};
export {NotFound};