import { ErrorMessage, useField } from "formik";
import { Button } from "../button";

interface SucessMessageProps {
    SuccessMessage: string;
}

export const SucessMessageAlert: React.FC<SucessMessageProps> = ({ SuccessMessage }) => {
    return (
        <div className="flex items-center py-4 px-4 mb-4 text-sm text-green-800 rounded-2xl bg-[#b6ffd8] dark:bg-[#0b4626] dark:text-green-400" role="alert">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <div>
                <span className="font-medium md:text-[1rem] ml-2">{SuccessMessage}</span>
            </div>
        </div>
    )
}

interface ErrorMessageProps {
    name: string,
    component?: React.ElementType
}

export const ErrorMessageAlert: React.FC<ErrorMessageProps> = ({ name, component }) => {
    const [, meta] = useField(name);

    return (
        <>
            {meta.touched && meta.error && (
                <div className="w-full mt-4 flex items-center px-4 py-3 mb-4 text-sm text-red-800 rounded-2xl bg-[#faedd4]">
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

interface ModalConfirm {
    title?: string,
    message?: string,
    onConfirm: () => void,
    onCancel: () => void,
    isOpen: boolean,
}

export const ModalConfirm: React.FC<ModalConfirm> = ({ title, message, onConfirm, onCancel, isOpen }) => {
    return (
        <div className={`${isOpen ? 'flex' : 'hidden'}
                         overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center cursor-default items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>

            <div className="fixed inset-0 z-50 flex items-center px-5 justify-center bg-black/30 backdrop-blur-sm">
                <div className="relative bg-[#f3f3f3] rounded-lg ">
                    <div className="px-8 py-6 md:p-6 text-center">
                        <svg className="mx-auto mb-4 text-[#B23C3C] w-11"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-3 text-lg font-normal text-gray-900">
                            {title}
                        </h3>
                        <p className="mb-5 text-md text-[#6b3f23bd]">{message}</p>
                        <div className='flex gap-4'>
                            <Button theme='red' onClick={onConfirm} name='Sim' />
                            <Button theme='beige' onClick={onCancel} name='Cancelar' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}