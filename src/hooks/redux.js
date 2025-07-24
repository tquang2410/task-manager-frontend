import { useDispatch, useSelector } from "react-redux";

 const useAppDispatch = () => useDispatch();
 const useAppSelector = useSelector;

// Typed selector cho auth
 const useAuth = () => useSelector((state) => state.auth);

export { useAppDispatch, useAppSelector, useAuth };