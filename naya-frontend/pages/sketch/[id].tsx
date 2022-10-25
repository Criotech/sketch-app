import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import Header from '../../components/Header';
import SketchAccordion from '../../components/SketchAccordion';
import CollaboratorsAccordion from '../../components/CollaboratorsAccordion';
import DrawingCanvas from '../../components/Canvas';
import PrivateRoute from '../../components/PrivateRoute';
import { get, patch, post } from '../../services/rest_service';

interface IProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    color: string;
    dp: { id: string; url: string } | null;
  };
}

const Sketch: NextPage<IProps> = ({ user }) => {
  const path = Router.query.id as string;
  const [canvasImageData, setCanvasString] = useState<string>('');
  const [allCanvasData, setAllCanvas] = useState<string[]>([]);
  const [allCollaborators, setAllCollaborators] = useState<
    { name: string; color: string }[]
  >([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchSketch = async (path: string) => {
    let sketch = await get(`/sketches/${path}`);
    let canvasImageData = sketch.data.data.sketchImage;
    setCanvasString(canvasImageData);
    let allContributorsData =
      sketch.data.data.collaboators &&
      (sketch.data.data.collaboators.map((item: any) => {
        return {
          name: `${item.firstName} ${item.lastName}`,
          color: item.color,
        };
      }) as string[]);
    setAllCollaborators(allContributorsData);
    if (sketch.data.data.userId !== user._id) {
      await joinAsCollaborator(path);
    }
  };

  const joinAsCollaborator = async (path: string) => {
    let joinAsCollaborator = await post(`/sketches/${path}/join`, {});
    if (joinAsCollaborator.data) {
      let sketch = await get(`/sketches/${path}`);
      let allContributorsData =
        sketch.data.data.collaboators &&
        (sketch.data.data.collaboators.map((item: any) => {
          return {
            name: `${item.firstName} ${item.lastName}`,
            color: item.color,
          };
        }) as string[]);
      setAllCollaborators(allContributorsData);
      alert('You joined as collaborator');
    }
  };

  const fetchAllSketches = async () => {
    let sketches = await get(`/sketches`);
    let allCanvasData = sketches.data.data.map(
      (item: any) => item._id
    ) as string[];
    setAllCanvas(allCanvasData);
  };

  const saveSketchFile = async (canvasImageData: string) => {
    setLoading(true);
    let res = await patch(`/sketches/${path}`, {
      sketchImage: canvasImageData,
    });
    if (res.data) {
      alert('File saved successfully');
      setLoading(false);
    }
  };

  const createNewSketchFile = async () => {
    setLoading(true);
    let res = await post('/sketches', {});
    if (res.data) {
      fetchAllSketches();
    }
  };

  useEffect(() => {
    if (path) {
      fetchAllSketches();
      fetchSketch(path);
    }
  }, [path]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='h-screen w-screen fixed overflow-hidden bg-gray-100'>
        <section className='pb-10 h-full'>
          <Header
            name={user.firstName}
            isAuthenticated={user ? true : false}
            user={user}
          />
          <div className='h-full flex'>
            <div className='flex-1 py-10 px-10'>
              <DrawingCanvas
                canvasImageData={canvasImageData}
                color={user.color}
                saveSketchFile={saveSketchFile}
                isLoading={isLoading}
                fileId={path}
              />
            </div>

            <div className='py-10 w-1/5'>
              <SketchAccordion
                title='SKETCHES'
                accordionChildren={allCanvasData}
                activeChild={path}
                createNewSketchFile={createNewSketchFile}
              />

              <div className='mt-10'>
                <CollaboratorsAccordion
                  title='USERS'
                  accordionChildren={allCollaborators}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivateRoute(Sketch);
