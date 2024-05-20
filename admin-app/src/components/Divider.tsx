import { ThemeProvider } from "@emotion/react"
import { Divider, DividerProps } from "@mui/material"
import { dividerTheme } from "./Theme"

const CustomDivider = ({children, ...rest}: DividerProps) => {
    const hasContent = children && children.toString().trim() !== "";

    return (
        <ThemeProvider theme={dividerTheme}>
            <Divider {...rest}>
                {hasContent ? children : null}
            </Divider>
        </ThemeProvider>
    );
};

export default CustomDivider;