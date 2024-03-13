import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import classNames from 'classnames';
import { createRoot } from 'react-dom/client';
import { useForm } from 'react-hook-form';
import { PlayerProfile } from '../types/schemas';
import { useReplicant } from '@nodecg/react-hooks';
import { ToJson } from './util';
import './index.dashboard.css';
import { NodeCG } from '@nodecg/types/types/nodecg';

type PlayerProfileJson = ToJson<PlayerProfile>;

const Panel = () => {
  const [playerProfile, setPlayerProfile] = useReplicant<PlayerProfileJson>('playerProfile', {
    bundle: "Kirby's Quickstart",
  });
  const [profilePicturesReplicant, setProfilePictures] = useReplicant('assets:profilePictures');
  const [loading, setLoading] = useState<boolean>(true);

  const profilePictures = (profilePicturesReplicant || []) as unknown as NodeCG.AssetFile[];

  console.log(playerProfile, profilePicturesReplicant);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PlayerProfile>();

  useEffect(() => {
    if (playerProfile && profilePicturesReplicant) {
      reset({ ...playerProfile });
      setLoading(false);
    }
  }, [playerProfile, profilePicturesReplicant]);

  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }

  const onSubmit = (data: PlayerProfile) => {
    setPlayerProfile(data);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text text-lg font-bold">Gamertag</span>
        </label>
        <input
          {...register('gamertag', { required: true })}
          type="text"
          placeholder="Gamertag"
          className="input input-bordered w-full max-w-xs bg-gray-800"
        />
        <label className="label">
          <span className="label-text text-lg font-bold">Team</span>
        </label>
        <input
          {...register('team')}
          type="text"
          placeholder="Team"
          className="input input-bordered w-full max-w-xs bg-gray-800"
        />
        <label className="label">
          <span className="label-text text-lg font-bold">Region</span>
        </label>
        <input
          {...register('region')}
          type="text"
          placeholder="Region"
          className="input input-bordered w-full max-w-xs bg-gray-800"
        />
        <label className="label">
          <span className="label-text text-lg font-bold">Seed</span>
        </label>
        <input
          {...register('seed', { valueAsNumber: true })}
          type="number"
          min={0}
          placeholder="Seed"
          className="input input-bordered w-full max-w-xs bg-gray-800"
        />
        <label className="label flex flex-col items-start">
          <h3 className="label-text text-lg font-bold">Profile Picture</h3>
          <p className="label-text text-sm italic">
            You can use the Assets tab to upload profile pictures.
          </p>
        </label>
        <select
          {...register('profile_picture')}
          className={classNames(
            'px-4 py-3 rounded-full bg-gray-800',
            profilePictures.length === 0 && 'disabled'
          )}
        >
          <option value={''}>None</option>
          {profilePictures?.map(asset => (
            <option key={`option-${asset.sum}`} value={asset.url}>
              {asset.name}
              {asset.ext}
            </option>
          ))}
        </select>
        <label className="label">
          <span className="label-text text-lg font-bold">Description</span>
        </label>
        <textarea
          {...register('description')}
          placeholder="Enter description here..."
          className="input input-bordered w-full bg-gray-800"
        />
        <button
          type="submit"
          className={classNames('btn btn-primary mt-4 ', !isDirty ? 'btn-disabled' : '')}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Panel />);
