import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    styled,
    Switch,
    FormControlLabel,
    Box,
    Avatar,
    Link,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { ThemeProvider, makeStyles } from "@material-ui/core";
import theme from "../../ui/Theme";
import { LockOutlined } from "@mui/icons-material";

const initialValues = {
    email: "",
    password: "",
    conformPassword: "",
    userType: "developer",
    userName: "",
    college: "",
    graduationYear: "",
    fullName: "",
    contact: "",
    address: "",
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            color: "#fff",
            transform: "translateX(22px)",
            "& .MuiSwitch-thumb:before": {
                backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS44LDI1LjgpIHNjYWxlKDAuNywwLjcpIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIj48L3BhdGg+PGcgc3Ryb2tlPSJub25lIj48cGF0aCBkPSJNMTQuMzMzMzMsMTE4LjI1djM1LjgzMzMzaDE0My4zMzMzM3YtMzUuODMzMzNjMCwtMy45NTk1OCAtMy4yMDcwOCwtNy4xNjY2NyAtNy4xNjY2NywtNy4xNjY2N2gtMTI5Yy0zLjk1OTU4LDAgLTcuMTY2NjcsMy4yMDcwOCAtNy4xNjY2Nyw3LjE2NjY3eiIgZmlsbD0iIzAwNzhkNCI+PC9wYXRoPjxwYXRoIGQ9Ik00Ni41ODMzMywzMi4yNWg3OC44MzMzM3YtNy4xNjY2N2MwLC0zLjk1NiAtMy4yMTA2NywtNy4xNjY2NyAtNy4xNjY2NywtNy4xNjY2N2gtNjQuNWMtMy45NTYsMCAtNy4xNjY2NywzLjIxMDY3IC03LjE2NjY3LDcuMTY2Njd6IiBmaWxsPSIjMTk5YmUyIj48L3BhdGg+PHBhdGggZD0iTTIxLjUsMzkuNDE2Njd2NzEuNjY2NjdoMTI5di03MS42NjY2N3oiIGZpbGw9IiMxOTliZTIiPjwvcGF0aD48cmVjdCB4PSIxMCIgeT0iMzUiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzAwNTA5NCI+PC9yZWN0PjxyZWN0IHg9IjM0IiB5PSIzNSIgdHJhbnNmb3JtPSJzY2FsZSgzLjU4MzMzLDMuNTgzMzMpIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDA1MDk0Ij48L3JlY3Q+PHJlY3QgeD0iMTgiIHk9IjM1IiB0cmFuc2Zvcm09InNjYWxlKDMuNTgzMzMsMy41ODMzMykiIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiBmaWxsPSIjMDA1MDk0Ij48L3JlY3Q+PHJlY3QgeD0iMTAiIHk9IjIzIiB0cmFuc2Zvcm09InNjYWxlKDMuNTgzMzMsMy41ODMzMykiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwZDYyYWIiPjwvcmVjdD48cmVjdCB4PSIxOCIgeT0iMjMiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzBkNjJhYiI+PC9yZWN0PjxyZWN0IHg9IjI2IiB5PSIyMyIgdHJhbnNmb3JtPSJzY2FsZSgzLjU4MzMzLDMuNTgzMzMpIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMGQ2MmFiIj48L3JlY3Q+PHJlY3QgeD0iMzQiIHk9IjIzIiB0cmFuc2Zvcm09InNjYWxlKDMuNTgzMzMsMy41ODMzMykiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwZDYyYWIiPjwvcmVjdD48cmVjdCB4PSIxMCIgeT0iMTUiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzBkNjJhYiI+PC9yZWN0PjxyZWN0IHg9IjE4IiB5PSIxNSIgdHJhbnNmb3JtPSJzY2FsZSgzLjU4MzMzLDMuNTgzMzMpIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMGQ2MmFiIj48L3JlY3Q+PHJlY3QgeD0iMjYiIHk9IjE1IiB0cmFuc2Zvcm09InNjYWxlKDMuNTgzMzMsMy41ODMzMykiIHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwZDYyYWIiPjwvcmVjdD48cmVjdCB4PSIzNCIgeT0iMTUiIHRyYW5zZm9ybT0ic2NhbGUoMy41ODMzMywzLjU4MzMzKSIgd2lkdGg9IjQiIGhlaWdodD0iNCIgZmlsbD0iIzBkNjJhYiI+PC9yZWN0PjxwYXRoIGQ9Ik0xNTAuNSwzOS40MTY2N2gtMTI5Yy0xLjk4MTU4LDAgLTMuNTgzMzMsLTEuNjAxNzUgLTMuNTgzMzMsLTMuNTgzMzNjMCwtMS45ODE1OCAxLjYwMTc1LC0zLjU4MzMzIDMuNTgzMzMsLTMuNTgzMzNoMTI5YzEuOTgxNTgsMCAzLjU4MzMzLDEuNjAxNzUgMy41ODMzMywzLjU4MzMzYzAsMS45ODE1OCAtMS42MDE3NSwzLjU4MzMzIC0zLjU4MzMzLDMuNTgzMzN6IiBmaWxsPSIjMzVjMWYxIj48L3BhdGg+PC9nPjwvZz48L2c+PC9zdmc+')`,
            },
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor:
                    theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
        width: 32,
        height: 32,
        "&:before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzIgMTcyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNS44LDI1LjgpIHNjYWxlKDAuNywwLjcpIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwxNzJ2LTE3MmgxNzJ2MTcyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJub25lIj48L3BhdGg+PGcgc3Ryb2tlPSJub25lIj48cGF0aCBkPSJNOTEuMzA3ODEsMTQ2LjAyODY3Yy02LjE2ODU3LC0xNC40MjU4NCAtMi4xNDY1MiwtMzEuMTg5ODQgOS44OTU5MywtNDEuMjQ2NDdjMTIuMDQyNDUsLTEwLjA1NjYyIDI5LjI1NDk0LC0xMS4wMjU1NCA0Mi4zNDk5NCwtMi4zODM5NGMxMy4wOTUsOC42NDE2IDE4Ljk3MzAyLDI0Ljg0ODMxIDE0LjQ2MjQsMzkuODc1M2MtNC41MTA2MiwxNS4wMjY5OSAtMTguMzQyMjYsMjUuMzE3NDkgLTM0LjAzMTYzLDI1LjMxODk0Yy0xNC4yNDEyNCwwLjA0OTYgLTI3LjEyMTgzLC04LjQ1MDUgLTMyLjY3NjY0LC0yMS41NjM4M3oiIGZpbGw9IiM5YjU5YjYiPjwvcGF0aD48cGF0aCBkPSJNNTAuNjc5NTMsOC44NjUzOWMyLjIwOTU4LC0zLjU0MDE1IDYuNDc2NjYsLTUuMjE1ODcgMTAuNTA0NzcsLTQuMTI1MzFsMTAuNjQ5MjIsMi44NzU2M2M0LjI3OTU2LDEuMTU4NiA4Ljc1NTQxLDEuNDAxMjggMTMuMTM1MTYsMC43MTIxOWwyMy4yNTM1OSwtMy42NTgzNmMwLDcuOTI4MTMgLTMuMTE0MTQsMTYuMjUyNjYgLTkuODA5MzcsMTkuNzA2MDljLTAuNzMzNTIsMC4zODAwMyAtMS40OTkwNSwwLjY5NDc4IC0yLjI4NzczLDAuOTQwNjNjMCwwIC0yMy4wMDUsMy41MzQwNiAtMzcuNzU2MDIsNC4zOTA3Yy0yLjA0MjUsMC4xMjA5NCAtMy45MjM3NSwwLjE4ODEzIC01LjU2NjQ4LDAuMTg4MTNjLTAuOTQzNjksMC4wMDA1NCAtMS44NDg4OSwtMC4zNzQxMSAtMi41MTYxOCwtMS4wNDE0Yy0wLjY2NzI5LC0wLjY2NzI5IC0xLjA0MTkzLC0xLjU3MjQ5IC0xLjA0MTQsLTIuNTE2MTh2LTEyLjQ1NjU2Yy0wLjAwNTc5LC0xLjc3Mzg2IDAuNDkxNjEsLTMuNTEyOTkgMS40MzQ0NSwtNS4wMTU1NXoiIGZpbGw9IiM0YjVkNjMiPjwvcGF0aD48cGF0aCBkPSJNNDUuNjUwNTUsOTguMTQ3NWMxMS41NjA5Niw5Ljk5OTc2IDI4LjY1ODUyLDEwLjE3MDI5IDQwLjQxNjY0LDAuNDAzMTNsMC40OTA0NywtMC40MDMxM2gxNC4zMTQzYzIuNzU3NDYsLTAuMDA1MTMgNS40ODIzNiwwLjU5NTgyIDcuOTgxODgsMS43NjAzMWMtMTcuMjk4NjksOC4xNTQ2NyAtMjUuMDUwMjgsMjguNTMwMjYgLTE3LjU0NjAyLDQ2LjEyMDg2aC03OC44MjQzN3YtMjguOTQ0MzdjMC4wMDA0NSwtNS4wMjI4IDEuOTk2MTcsLTkuODM5NjkgNS41NDgxNCwtMTMuMzkxMDNjMy41NTE5NywtMy41NTEzNCA4LjM2OTIyLC01LjU0NjIxIDEzLjM5MjAyLC01LjU0NTc2eiIgZmlsbD0iIzAwYWNlYSI+PC9wYXRoPjxwYXRoIGQ9Ik04Ni41NTc2Niw4NC42ODY0OGMtMTEuNzYxNTIsMTAuMDI1NzEgLTI5LjA2MzI1LDEwLjAyNDI5IC00MC44MjMxMiwtMC4wMDMzNmMtNy41MTQ1NSwtNi4zMDUxOCAtMTEuODY0ODEsLTE1LjYwNDMzIC0xMS44ODg4MywtMjUuNDEzNjd2LTE5LjQ1NDE0aDAuMTAwNzhjMy42NjUwOCwwLjU5MTI1IDEzLjY4OTQ1LDEuNTc1NTUgMjQuNDI2MDIsLTEwLjA0NDUzbC0wLjAwMzM2LC0wLjA2MzgzYzE0Ljc1MTAyLC0wLjg1NjY0IDM3Ljc1NjAyLC00LjM5MDcgMzcuNzU2MDIsLTQuMzkwN2MwLjc4ODY5LC0wLjI0NTg0IDEuNTU0MjIsLTAuNTYwNiAyLjI4NzczLC0wLjk0MDYybDAuMDM2OTUsMC4wNzM5MXYzNC44MTk5MmMtMC4wMTcyOSw4LjY1NzE2IC0zLjQxMTI0LDE2Ljk2NjA1IC05LjQ2LDIzLjE1OTUzYy0wLjc3MjE3LDAuNzkzIC0xLjU4Mzk0LDEuNTQ2NDYgLTIuNDMyMTksMi4yNTc1ek05MC4wMzEyNSw1Mi43MDUyM2MwLC01LjU5MTk3IC00LjUzMzE5LC0xMC4xMjUxNiAtMTAuMTI1MTYsLTEwLjEyNTE2Yy01LjU5MTk3LDAgLTEwLjEyNTE2LDQuNTMzMTkgLTEwLjEyNTE2LDEwLjEyNTE2YzAsNS41OTE5NyA0LjUzMzE5LDEwLjEyNTE2IDEwLjEyNTE2LDEwLjEyNTE2YzUuNTkxMzUsLTAuMDAxNDggMTAuMTIzNjcsLTQuNTMzOCAxMC4xMjUxNiwtMTAuMTI1MTZ6TTYyLjUxNDYxLDUyLjcwNTIzYzAsLTUuNTkxOTcgLTQuNTMzMTksLTEwLjEyNTE2IC0xMC4xMjUxNiwtMTAuMTI1MTZjLTUuNTkxOTcsMCAtMTAuMTI1MTYsNC41MzMxOSAtMTAuMTI1MTYsMTAuMTI1MTZjMCw1LjU5MTk3IDQuNTMzMTksMTAuMTI1MTYgMTAuMTI1MTYsMTAuMTI1MTZjNS41OTE4OSwtMC4wMDAxOSAxMC4xMjQ5NywtNC41MzMyNiAxMC4xMjUxNiwtMTAuMTI1MTZ6IiBmaWxsPSIjZjdjYWE1Ij48L3BhdGg+PGNpcmNsZSBjeD0iMjM3Ljg2IiBjeT0iMTU2Ljg5IiB0cmFuc2Zvcm09InNjYWxlKDAuMzM1OTQsMC4zMzU5NCkiIHI9IjMwLjE0IiBmaWxsPSIjOWI1OWI2Ij48L2NpcmNsZT48cGF0aCBkPSJNODYuNTU3NjYsODQuNjg2NDh2MTMuNDYxMDJsLTAuNDkwNDcsMC40MDMxM2MtMTEuNzU4MTIsOS43NjcxNyAtMjguODU1NjgsOS41OTY2MyAtNDAuNDE2NjQsLTAuNDAzMTN2LTEzLjM2MzU5bDAuMDgzOTgsLTAuMTAwNzhjMTEuNzU5ODcsMTAuMDI3NjUgMjkuMDYxNiwxMC4wMjkwNyA0MC44MjMxMiwwLjAwMzM2eiIgZmlsbD0iI2VkYjI4OCI+PC9wYXRoPjxjaXJjbGUgY3g9IjE1NS45NSIgY3k9IjE1Ni44OSIgdHJhbnNmb3JtPSJzY2FsZSgwLjMzNTk0LDAuMzM1OTQpIiByPSIzMC4xNCIgZmlsbD0iIzliNTliNiI+PC9jaXJjbGU+PHBhdGggZD0iTTU4LjM2OTE0LDI5LjcwNjk1bDAuMDAzMzYsMC4wNjM4M2MtMTAuNzM2NTYsMTEuNjIwMDggLTIwLjc2MDk0LDEwLjYzNTc4IC0yNC40MjYwMiwxMC4wNDQ1M2gtMC4xMDA3OHYtMi41OTY4YzAuMDAxNTksLTExLjgxOTAxIDYuNDU4LC0yMi42OTM1MSAxNi44MzM4MywtMjguMzUzMTJjLTAuOTQyODUsMS41MDI1NSAtMS40NDAyNCwzLjI0MTY4IC0xLjQzNDQ1LDUuMDE1NTV2MTIuNDU2NTZjLTAuMDAwNTQsMC45NDM2OSAwLjM3NDExLDEuODQ4ODkgMS4wNDE0LDIuNTE2MThjMC42NjcyOSwwLjY2NzI5IDEuNTcyNDksMS4wNDE5MyAyLjUxNjE4LDEuMDQxNGMxLjY0MjczLDAgMy41MjM5OCwtMC4wNjcxOSA1LjU2NjQ4LC0wLjE4ODEzeiIgZmlsbD0iIzRiNWQ2MyI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjMuOTg0NDUsOTQuNTE2MDJjLTUuMjE1OTcsLTAuMDIyOTIgLTEwLjM3ODI4LDEuMDUzMDQgLTE1LjE1MDc4LDMuMTU3ODFjLTIuNTIzMDgsLTEuMDUwNTIgLTUuMjI4NjgsLTEuNTkyNzggLTcuOTYxNzIsLTEuNTk1N2gtMTIuMTg0NDV2LTEwLjQ2OTE2YzAuNjI4LC0wLjU1OTk4IDEuMjI2NjUsLTEuMTUyMDEgMS43OTM1NywtMS43NzM3NWM2LjQxNTA3LC02LjU2NDYyIDkuOTkzNjMsLTE1LjM4NzE4IDkuOTY0MjQsLTI0LjU2NTc3di0zMy43NTE2NGM1LjAzOTA2LC0zLjEwMjA1IDkuNzgyODQsLTkuOTc3MzQgOS43ODI4NCwtMjAuODQ4MjhjMC4wMDI0MiwtMC41ODg3NSAtMC4yNTM3MSwtMS4xNDg4OSAtMC43MDA2MiwtMS41MzIxNmMtMC40NDY5MSwtMC4zODMyOCAtMS4wMzk1NCwtMC41NTEwNiAtMS42MjEwNCwtMC40NTg5NGwtMjMuMjUyMjUsMy42NTgzNmMtNC4wOTk0NSwwLjY1MDU5IC04LjI5MDMzLDAuNDIzMTggLTEyLjI5NTMxLC0wLjY2NzE3bC0xMC42NDkyMiwtMi44NzU2M2MtNC42ODM1OSwtMS4yODY5MSAtOS42NjczNywwLjU0NDU2IC0xMi40MDMxNSw0LjU1OGMtMTAuNzU3NjYsNi4wOTIyIC0xNy40MDI5OCwxNy41MDM2IC0xNy4zOTI0OSwyOS44NjY1MnYyMi4wNTA5NGMwLjA0MjYzLDEwLjAxOTQxIDQuMzEyMywxOS41NTU0MSAxMS43NTc4MSwyNi4yNjAyM3YxMC41NDg0NGgtMTIuMjQ4MjhjLTExLjU4ODE1LDAuMDMzMiAtMjAuOTc0NDcsOS40MTgwMyAtMjEuMDA5NTMsMjEuMDA2MTd2MjguOTQ0MzdjMC4wMTcxNSwxLjE0NDEyIDAuOTI2LDIuMDc1MSAyLjA2OTM3LDIuMTE5NzdoNzcuNTIxMjdjNi4yMDUxNCwxMy4xNDU3NCAxOS40NDMxLDIxLjUyNjM4IDMzLjk3OTc0LDIxLjUxMTc2YzIwLjcwMzgzLDAgMzcuNTQ3NzMsLTE2Ljg2ODQzIDM3LjU0NzczLC0zNy41NzAyNGMwLC0yMC43MDE4MSAtMTYuODQzOTEsLTM3LjU3Mzk0IC0zNy41NDc3MywtMzcuNTczOTR6TTQ3LjcwMzEzLDg4LjYyNTY5YzUuNDg3NDYsMy42NDczMyAxMS45Mjk1Myw1LjU5MzU3IDE4LjUxODU1LDUuNTk0N2M2LjUxMDEzLDAgMTIuNzIzNjMsLTEuOTQ4NDQgMTguNDM0NTcsLTUuNTM2MjV2OC41MDQyNmMtNS4zNzUsNC4yMjk0NSAtMTEuNzc0MjcsNi41NTkxOCAtMTguNDgxNiw2LjU1OTE4Yy02LjcyNDQ2LDAgLTEzLjQzMjQ2LC0yLjMyMjM0IC0xOC40NzE1MiwtNi41NDgwOXpNNTIuMzg3NzcsOS45MzUzNWMxLjM1Mjg2LC0yLjE4MTg3IDMuNzM2OTUsLTMuNTA5OTggNi4zMDQyLC0zLjUxMTg5YzAuNjY0MjIsMC4wMDA1IDEuMzI1NDYsMC4wODg3MiAxLjk2NjU4LDAuMjYyMzdsMTAuNjQ5MjIsMi44NzUyOWM0LjU1MjE1LDEuMjM5MSA5LjMxNTU0LDEuNDk3NDIgMTMuOTc1LDAuNzU3ODhsMjAuODI4MTMsLTMuMjc2NzNjLTAuNTk0MjcsNy4xMjE4NyAtMy44NDU4MSwxMy4wNzkzOSAtOC42MjM1MiwxNS41NDM4M2MtMC41ODUwOSwwLjMwMjk0IC0xLjE5MzkzLDAuNTU3NjUgLTEuODIwNDUsMC43NjE1N2MtMi4wMzk0OCwwLjMwOTQgLTIzLjU1MTkxLDMuNTQyMTIgLTM3LjQxNDM3LDQuMzQ3MDNjLTIuMDcwMDUsMC4xMjI2MiAtMy45MDI5MiwwLjE4NDc3IC01LjQ0NzU2LDAuMTg0NzdjLTAuMzg3MDgsLTAuMDAwMDYgLTAuNzU2NDEsLTAuMTYyMzcgLTEuMDE4MjMsLTAuNDQ3NDdjLTAuMjczMDEsLTAuMjk2NzcgLTAuNDEzMjQsLTAuNjkyMDEgLTAuMzg4MzQsLTEuMDk0NDh2LTEyLjQ1NjU2Yy0wLjAyODExLC0xLjM4Nzg1IDAuMzM4MzksLTIuNzU1MTYgMS4wNTY4NiwtMy45NDI5ek00Ny4zNTEwNiwxMy41NzE4OGMtMC4wMDMwMiwwLjEwMzQ3IDAuMDE2MTMsMC4yMDU5MyAwLjAxNjEzLDAuMzA5NzN2MTIuNDU1ODljLTAuMDMxNjksMS40Njk2NCAwLjUzMTAzLDIuODg5ODcgMS41NjA2NywzLjkzOWMxLjAyOTY1LDEuMDQ5MTIgMi40MzkwOSwxLjYzODM1IDMuOTA5MDYsMS42MzQyMWMwLjE0MDc2LDAgMC4zMTEwOCwwIDAuNDU1ODcsLTAuMDAyMDJjLTUuNDczNDMsNC41OTgzMSAtMTEuMzAwNiw2LjY1MTU2IC0xNy4zNDc0OCw2LjExNDA2di0wLjgwNDIzYzAuMDEzOTcsLTkuMjA1MjMgNC4yMTAzOCwtMTcuOTA1MyAxMS40MDU3NSwtMjMuNjQ2NjR6TTM1Ljk0NTMxLDU5LjI2OTQ1di0xNy4yMDQzN2MwLjY3MTg4LDAuMDQ1NjkgMS4xOTI5MSwwLjA3MDU1IDEuNzk3MjcsMC4wNzA1NWM5LjQ1NTYzLDAgMTYuODA0OTQsLTUuNDAyODggMjEuNjM2MDUsLTEwLjQ2OTgzYzE0LjY5ODYxLC0wLjkzNTkyIDM2LjgyNjQ4LC00LjMyMjUxIDM3LjA1MzkxLC00LjM1NzExaC0wLjAxNzQ3djMxLjk2MDc2Yy0wLjAyODA1LDkuMjEyMDkgLTQuMTA5NywxNy45NDQ4IC0xMS4xNTkxNywyMy44NzUwOGMtMTAuOTk0NjIsOS4zOTU1NCAtMjcuMTkxMiw5LjM5Mzk3IC0zOC4xODQsLTAuMDAzN2MtNy4wNjIyOSwtNS45MTU3NCAtMTEuMTM3NDgsLTE0LjY1ODc5IC0xMS4xMjY1OSwtMjMuODcxMzh6TTE0LjQ0NTMxLDExNy4wODQzYzAuMDMyNjMsLTkuMzYyNzUgNy42MTU1MiwtMTYuOTQ0MTQgMTYuOTc4MjgsLTE2Ljk3NDkyaDEzLjQ4ODljMTIuMjk3MzUsMTAuMTU0MjIgMzAuMDcwNDEsMTAuMTU0MjIgNDIuMzY3NzcsMGgxMy41OTE3YzAuOTc5NTMsMC4wMDkxNyAxLjk1NjQ1LDAuMTAyNTcgMi45MTk5NywwLjI3OTE2Yy0xMC43ODMzNyw2Ljk0ODE5IC0xNy4zMTQ0NywxOC44ODQ1MyAtMTcuMzUxODQsMzEuNzEyNWMwLjAwOTQ4LDQuMDgyOTkgMC42NjU5OCw4LjEzODY4IDEuOTQ1MDgsMTIuMDE2MTVoLTczLjkzOTg0ek0xMjMuOTg0NDUsMTY1LjU3Njg4Yy0xMy4xODU5NCwwLjAwODY3IC0yNS4xNDkwMywtNy43MjI5MyAtMzAuNTU3MjEsLTE5Ljc0ODc2Yy0wLjA0MTIzLC0wLjQxNDU1IC0wLjIxMDY3LC0wLjgwNTk0IC0wLjQ4NDc2LC0xLjExOTY4Yy0xLjY0MDM3LC00LjAxMzQzIC0yLjQ3OTg1LC04LjMwODk4IC0yLjQ3MTE2LC0xMi42NDQ2OWMwLjAzNTUzLC0xMi45NzMzMSA3LjUyMDQzLC0yNC43NzI1MSAxOS4yNDE4MywtMzAuMzMyOHYwYzQuNDYwNiwtMi4xMDk1IDkuMzM1NzEsLTMuMTk3MDQgMTQuMjY5OTUsLTMuMTgzMzRjMTguNTA5NzIsMCAzMy41MTQ4LDE1LjAwNTA5IDMzLjUxNDgsMzMuNTE0OGMwLDE4LjUwOTcyIC0xNS4wMDUwOSwzMy41MTQ4IC0zMy41MTQ4LDMzLjUxNDh6IiBmaWxsPSIjMDgzODYzIj48L3BhdGg+PHBhdGggZD0iTTExNy4wNTY0MSwxMTguNzc3NzZjLTAuMzMwNDMsLTAuNDIwMzEgLTAuODE0MzEsLTAuNjkyMTIgLTEuMzQ1MTYsLTAuNzU1NjNjLTAuNTMwODYsLTAuMDYzNTEgLTEuMDY1MiwwLjA4NjUgLTEuNDg1NDUsMC40MTdsLTE1LjE0NDA2LDExLjkwOTMyYy0wLjQ4NTk5LDAuMzgyMTUgLTAuNzY5NzMsMC45NjYyIC0wLjc2OTczLDEuNTg0NDVjMCwwLjYxODI1IDAuMjgzNzMsMS4yMDIzIDAuNzY5NzMsMS41ODQ0NWwxNS4xNDQwNiwxMS45MDU2M2MwLjU2NTg0LDAuNDQ4NjkgMS4zMjg0OCwwLjU2MDQgMS45OTkyMywwLjI5MjgyYzAuNjcwNzUsLTAuMjY3NTggMS4xNDcwOSwtMC44NzM1NSAxLjI0ODcyLC0xLjU4ODUxYzAuMTAxNjIsLTAuNzE0OTYgLTAuMTg3MDEsLTEuNDI5NjYgLTAuNzU2NjMsLTEuODczNTRsLTEzLjEyODc3LC0xMC4zMjEzNGwxMy4xMjk0NSwtMTAuMzIzMDJjMC40MjA2LC0wLjMzMDQ1IDAuNjkyNjIsLTAuODE0NTMgMC43NTYxMywtMS4zNDU2M2MwLjA2MzUxLC0wLjUzMTEgLTAuMDg2NjgsLTEuMDY1NjcgLTAuNDE3NSwtMS40ODU5OHoiIGZpbGw9IiMwODM4NjMiPjwvcGF0aD48cGF0aCBkPSJNMTMwLjQ1NTYyLDExOC43Nzc3NmMtMC4zMzA4MiwwLjQyMDMxIC0wLjQ4MTAyLDAuOTU0ODggLTAuNDE3NSwxLjQ4NTk4YzAuMDYzNTEsMC41MzExIDAuMzM1NTIsMS4wMTUxOCAwLjc1NjEzLDEuMzQ1NjNsMTMuMTI5MTEsMTAuMzI0MzdsLTEzLjEyODc3LDEwLjMyMTM0Yy0wLjU2OTYyLDAuNDQzODggLTAuODU4MjUsMS4xNTg1OCAtMC43NTY2MywxLjg3MzU0YzAuMTAxNjIsMC43MTQ5NiAwLjU3Nzk3LDEuMzIwOTMgMS4yNDg3MiwxLjU4ODUxYzAuNjcwNzUsMC4yNjc1OCAxLjQzMzM5LDAuMTU1ODggMS45OTkyMywtMC4yOTI4MmwxNS4xNDQwNiwtMTEuOTA1NjNjMC40ODU5OSwtMC4zODIxNSAwLjc2OTczLC0wLjk2NjIgMC43Njk3MywtMS41ODQ0NWMwLC0wLjYxODI1IC0wLjI4MzczLC0xLjIwMjMgLTAuNzY5NzMsLTEuNTg0NDVsLTE1LjE0NDA2LC0xMS45MDkzMmMtMC44NzQ3MiwtMC42ODgzMyAtMi4xNDE4MSwtMC41MzczMyAtMi44MzAyNywwLjMzNzI4eiIgZmlsbD0iIzA4Mzg2MyI+PC9wYXRoPjxwYXRoIGQ9Ik0xMjYuNzQ0ODUsMTEyLjI3M2MtMS4xMDAyOSwtMC4xNjQ5NiAtMi4xMjY1NywwLjU5MTYgLTIuMjk0NDUsMS42OTE0NWwtNS4zNzUsMzUuNTIxN2MtMC4xNjY1MiwxLjEwMDY4IDAuNTkwNzcsMi4xMjc5NCAxLjY5MTQ1LDIuMjk0NDVjMS4xMDA2OCwwLjE2NjUyIDIuMTI3OTQsLTAuNTkwNzcgMi4yOTQ0NSwtMS42OTE0NWw1LjM3NSwtMzUuNTIxN2MwLjA3OTk2LC0wLjUyODU2IC0wLjA1MzMyLC0xLjA2NzI0IC0wLjM3MDUzLC0xLjQ5NzU0Yy0wLjMxNzIxLC0wLjQzMDI5IC0wLjc5MjM2LC0wLjcxNjk1IC0xLjMyMDkyLC0wLjc5NjkyeiIgZmlsbD0iIzA4Mzg2MyI+PC9wYXRoPjxwYXRoIGQ9Ik02NC40NzM0Niw1My44NjY5MWMxLjA0OTAxLC0wLjU0Nzc0IDIuMjk5NjEsLTAuNTQ3NzQgMy4zNDg2MiwwYzAuNjA1NTgsNi4yNjUwMSA1LjkwMDg0LDExLjAyNzAxIDEyLjE5NDc1LDEwLjk2NjY3YzYuMjkzOTIsLTAuMDYwMzMgMTEuNDk2OTIsLTQuOTIyOTYgMTEuOTgyMjksLTExLjE5ODQzYzAuNDg1MzcsLTYuMjc1NDcgLTMuOTA4MDQsLTExLjg4MDMyIC0xMC4xMTc4MywtMTIuOTA3NzNjLTYuMjA5NzksLTEuMDI3NDEgLTEyLjE3NDMxLDIuODYzNzEgLTEzLjczNjA0LDguOTYxMDljLTEuMzA4MjUsLTAuMzUzMDggLTIuNjg2NzIsLTAuMzUzMDggLTMuOTk0OTcsMGMtMS41NjIzMSwtNi4xMDM1MiAtNy41MzIyMiwtOS45OTkxNCAtMTMuNzQ4MSwtOC45NzEyM2MtNi4yMTU4OCwxLjAyNzkyIC0xMC42MTM4Myw2LjYzODA2IC0xMC4xMjgwMywxMi45MTk2YzAuNDg1OCw2LjI4MTU0IDUuNjk0MDQsMTEuMTQ4NzcgMTEuOTk0MDUsMTEuMjA4NzRjNi4zMDAwMSwwLjA1OTk3IDExLjU5OTk2LC00LjcwNzI0IDEyLjIwNTI1LC0xMC45NzgzOXpNNzkuOTA2MDksNDQuNTk1MDNjNC40Nzg3NywwIDguMTA5NTMsMy42MzA3NiA4LjEwOTUzLDguMTA5NTNjMCw0LjQ3ODc3IC0zLjYzMDc2LDguMTA5NTMgLTguMTA5NTMsOC4xMDk1M2MtNC40Nzg3NywwIC04LjEwOTUzLC0zLjYzMDc2IC04LjEwOTUzLC04LjEwOTUzYzAuMDA1MzcsLTQuNDc2NDQgMy42MzMwOSwtOC4xMDM4NiA4LjEwOTUzLC04LjEwODg2ek00NC4yNzk5Miw1Mi43MDUyM2MwLC00LjQ3ODc3IDMuNjMwNzYsLTguMTA5NTMgOC4xMDk1MywtOC4xMDk1M2M0LjQ3ODc3LDAgOC4xMDk1MywzLjYzMDc2IDguMTA5NTMsOC4xMDk1M2MwLDQuNDc4NzcgLTMuNjMwNzYsOC4xMDk1MyAtOC4xMDk1Myw4LjEwOTUzYy00LjQ3NjcsLTAuMDA1IC04LjEwNDUzLC0zLjYzMjgzIC04LjEwOTUzLC04LjEwOTUzeiIgZmlsbD0iIzA4Mzg2MyI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')`,
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        borderRadius: 20 / 2,
    },
}));

const useStyles = makeStyles({
    root: {
        "& .MuiFormControl-root": {
            width: "100%",
            // margin: theme.spacing(1),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        "& .MuiButton-root": {
            width: "40%",
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            // margin: theme.spacing(1),
        },
    },
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3),
        width: "35%",
        // height: "100vw",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
        // display: "block",
        // verticalAlign: "middle",
    },
    formLink: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    mainContainer: {
        // height: "100%",
        // width: "100%",
        // margin: "10% auto",
        // Testing
        display: "grid",
        minHeight: "100vh",
        alignContent: "center",
        gridTemplateColumns: "auto",
        backgroundColor: theme.palette.common.lightMainGreenColor,
    },
    formButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        // color: theme.palette.primary.main
    },
});

const SignUp = (props) => {
    const [values, setValues] = useState(initialValues);

    const classes = useStyles();


    const handleInputChange = (e) => {
        let { name, value } = e.target;
        console.log("Values", value);
        setValues({
            ...values,
            [name]: value,
        });
    };
        

    const handleToggleSwitch = (e) => {
        let { name, checked } = e.target;
        // changeFields();
        if (checked) {
            setValues({
                ...values,
                [name]: "organization",
            });
        } else {
            setValues({
                ...values,
                [name]: "developer",
            });
        }
    };

    

    return (
        <ThemeProvider theme={theme}>
            <Grid className={classes.mainContainer} xs={12} sm={12} md={12}>
                <Paper className={classes.pageContent}>
                    <center>
                        <Avatar
                            style={{
                                backgroundColor: `${theme.palette.primary.main}`,
                            }}
                        >
                            <LockOutlined />
                        </Avatar>
                        <h2
                            style={{ color: `${theme.palette.secondary.main}` }}
                        >
                            Sign Up
                        </h2>
                    </center>
                    <form className={classes.root} elevaton={10}>
                        <Grid container sm={12} xs={12} md={12}>
                            <Grid item xs={12} sm={12} md={12}>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="email"
                                        name="email"
                                        label="Email"
                                        value={values.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        name="userName"
                                        label="User Name"
                                        value={values.userName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="text"
                                        name="fullName"
                                        label="Full Name"
                                        value={values.fullName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="password"
                                        name="password"
                                        label="Password"
                                        value={values.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        variant="outlined"
                                        type="password"
                                        name="conformPassword"
                                        label="Conform Password"
                                        value={values.conformPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="button">
                                        <label>Developer</label>
                                        <MaterialUISwitch
                                            sx={{ m: 1 }}
                                            onChange={handleToggleSwitch}
                                            name="userType"
                                        />
                                        <label>Organization</label>
                                    </Typography>
                                    {/* <FormControlLabel 
                                        control={
                                            
                                        }
                                        label="Organization"
                                    /> */}
                                </Box>

                                {/* Testing  */}

                                {values.userType == "developer" ? (
                                    <>
                                        <Box>
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="college"
                                                label="College"
                                                value={values.college}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                variant="outlined"
                                                type="number"
                                                name="graduationYear"
                                                label="Graduation Year"
                                                value={values.graduationYear}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Box>
                                    </>
                                ) : (
                                    <>
                                        <Box>
                                            <TextField
                                                variant="outlined"
                                                type="tel"
                                                name="contact"
                                                label="Contact Details"
                                                value={values.contact}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Box>
                                        <Box>
                                            <TextField
                                                variant="outlined"
                                                type="text"
                                                name="address"
                                                label="Address"
                                                value={values.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </Box>
                                    </>
                                )}

                                {/* {
                                    userFields
                                } */}
                                <center>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            style={{
                                                backgroundColor: `${theme.palette.secondary.main}`,
                                                color: `${theme.palette.common.ternaryColor}`,
                                            }}
                                            type="Submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2">
                                            <Link href="http://localhost:3000/auth/signin">
                                                <b
                                                    style={{
                                                        color: `${theme.palette.common.darkGreen}`,
                                                    }}
                                                >
                                                    Already have an account?
                                                    Sign In Here
                                                </b>
                                            </Link>
                                        </Typography>
                                    </Box>
                                </center>

                                {/* {changeFields = () => {renderUserTypeFields()}} */}
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
};

export default SignUp;
