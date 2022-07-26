import React, { useState, useEffect, useRef } from 'react'
import { updateTodo } from '../redux/features/todo/todoSlice'
import { useAppSelector } from '../redux/app/hooks'
import { deleteTodo, doneTodo } from '../redux/features/todo/todoSlice'
import { useAppDispatch } from '../redux/app/hooks'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { Todo } from '../mode'

const SingleTodoItem: React.FC<SingleTodoItem> = ({ todo }) => {
    const { loading } = useAppSelector((state) => state.todo)
    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const dispatch = useAppDispatch()

    const handleEdit = (e: React.FormEvent, todo: Todo) => {
        e.preventDefault()
        dispatch(updateTodo(todo))
        setEdit(false)
    }

    const handleDelete = (id: number) => {
        dispatch(deleteTodo(id))
    }

    const handleDone = (todo: Todo) => {
        dispatch(doneTodo(todo))
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit, dispatch])

    return (
            <form className='todos__single' onSubmit={(e) => {
                handleEdit(e, todo)
            }}>
                {
                    edit ? (
                        <input ref={inputRef} type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} className="todos__single--text" />
                    ) : todo.isDone ? (
                        <s className="todos__single--text">{editTodo}</s>
                    ) : (
                        <span className="todos__single--text">{editTodo}</span>
                    )
                }

                <div>
                    <span className="icon" onClick={(e) => {
                        if (!edit && !todo.isDone) {
                            setEdit(!edit)
                        }
                    }}><AiFillEdit /></span>
                    <span className="icon" onClick={(e) => { handleDelete(todo.id!) }}><AiFillDelete /></span>
                    <span className="icon" onClick={(e) => { handleDone(todo) }}><MdDone /></span>
                </div>
            </form>
        )
}

export default SingleTodoItem

type SingleTodoItem = {
    todo: Todo
}