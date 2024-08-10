
import { css } from '@emotion/css';
import Registration from "../components/Registration";
import Login from "../components/Login";

const LogReg = () => {

    return (
        <div className={css`
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #e5eaf5;
    `}>
            <Registration />
            <Login />
        </div>
    );
};

export default LogReg;
