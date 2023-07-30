'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { addPlayer } from '../services';
import { updatePlayer } from '@/actions/serverActions';
import { Player, PlayerSchema } from '../validation-schema';
import Field from '../components/Field';
import SnackBar from './SnackBar';

function Form({ id, player }: { id?: number; player?: Player }) {
  const router = useRouter();

  const [snackBarData, setSnackBarData] = useState<{
    text: string;
    variant: string;
    isOpen: boolean;
  }>({
    text: '',
    variant: 'info',
    isOpen: false
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Player>({
    resolver: zodResolver(PlayerSchema),
    defaultValues: player
  });

  useEffect(() => {
    const { variant, isOpen } = snackBarData;
    if (isOpen && variant === 'error') {
      setTimeout(() => {
        setSnackBarData({ ...snackBarData, isOpen: false });
      }, 2000);
    }
  }, [JSON.stringify(snackBarData)]);

  const handleBackHome = () => {
    // after 2s redirect to home page
    setTimeout(() => {
      router.push('/?page=1');
    }, 2000);
  };

  const onSubmit: SubmitHandler<Player> = (data) => {
    const innerData = {
      ...data
    };
    if (id) {
      //update player
      updatePlayer(id, innerData).then((res) => {
        if (res.error) {
          setSnackBarData({
            text: res.error,
            variant: 'error',
            isOpen: true
          });
        } else {
          setSnackBarData({
            text: 'player updated successfully',
            variant: 'success',
            isOpen: true
          });
          handleBackHome();
        }
      });
    } else {
      //create new player
      addPlayer(innerData)
        .then((res) => {
          if (res.error) {
            setSnackBarData({
              text: res.error,
              variant: 'error',
              isOpen: true
            });
          } else {
            setSnackBarData({
              text: 'player added successfully',
              variant: 'success',
              isOpen: true
            });

            handleBackHome();
          }
        })
        .catch((err) => {
          console.log(err);
          setSnackBarData({
            text: 'an error occured',
            variant: 'error',
            isOpen: true
          });
        });
    }
  };

  return (
    <>
      <form className="flex flex-col py-4" onSubmit={handleSubmit(onSubmit)}>
        <Field
          register={register}
          label="First Name"
          type="text"
          name="firstname"
          error={errors?.firstname?.message}
        />
        <Field
          register={register}
          label="Last Name"
          type="text"
          name="lastname"
          error={errors?.lastname?.message}
        />
        <Field
          register={register}
          label="Annual Salary"
          type="string"
          name="salary"
          error={errors?.salary?.message}
        />
        <Field
          register={register}
          label="Goals"
          type="number"
          name="goal"
          defaultValue={0}
          error={errors?.goal?.message}
        />

        <div className="flex justify-end px-4 py-3 mt-2 ">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-2 mx-2 rounded-md w-[90px] capitalize"
          >
            {id ? 'Update' : 'Save'}
          </button>

          <button
            className="flex items-center justify-evenly text-gray-800 border-2 border-gray-800 hover:bg-gray-400 hover:border-gray-400 hover:text-white border-collapse px-2 py-2 mx-2 rounded-md w-[90px]  capitalize"
            type="button"
            onClick={() => reset()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            reset
          </button>
        </div>
      </form>
      {snackBarData.isOpen && (
        <SnackBar
          text={snackBarData.text}
          variant={snackBarData.variant}
          onClose={() => setSnackBarData({ ...snackBarData, isOpen: false })}
        />
      )}
    </>
  );
}

export default Form;
