import { ErrorMessage, useField } from "formik";

interface SucessMessageProps {
    SuccessMessage: string;
}

export const SucessMessageAlert: React.FC<SucessMessageProps> = ({ SuccessMessage }) => {
    return (
        <div className="flex items-center py-5 px-4 mb-4 text-sm text-green-800 rounded-2xl bg-[#0000] dark:bg-[#240D13] dark:text-green-400" role="alert">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium ml-2">{SuccessMessage}</span>
            </div>
        </div>
    )
}

interface ErrorMessageProps {
    name: string,
    component?: React.ElementType 
}

export const ErrorMessageAlert: React.FC<ErrorMessageProps> = ({name, component}) => {
    const [, meta] = useField(name);

    return (
        <>
            {meta.touched && meta.error && (
                <div className="w-full mt-4 flex items-center px-4 py-5 mb-4 text-sm text-red-800 rounded-2xl bg-[#FFF9ED]">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <div className='ml-2'>
                        <ErrorMessage name={name} component={component} />
                    </div>    
                </div>
            )}
        </>
    )
}