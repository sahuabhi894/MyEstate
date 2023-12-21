import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
  { name: 'My Estate', to: '/', current: true }, // Update href to 'to'
  { name: 'Home', to: '/', current: false }, // Update href to 'to'
  { name: 'About', to: '/about', current: false }, // Update href to 'to'
  { name: 'Add Property', to: '/create-listing', current: false }, // Update href to 'to'
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };


  return (
    
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="data:image/png;base64,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"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                      >
                       {item.name}
                      </Link>
                    ))}
            
                  </div>
                </div>
                <div className="flex ml-auto">
                  <form onSubmit={handleSubmit} className='bg-white p-3  rounded-3xl flex items-center' >
                    <input
                      type='text'
                      placeholder='Search...'
                      className='bg-transparent text-black focus:outline-none w-16 sm:w-60'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                      <FaSearch className='text-slate-600' />
                    </button>
                  </form>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {currentUser ? (
               <>
                {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src = {currentUser.avatar}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-green-400' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              {`Hello, ${currentUser.username}`}
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to='/profile'
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Account
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to= '/sign-in'
                              onClick={handleSignOut}
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Sign out
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </>
                 ): (
                    <Link to='/sign-in'>
                      <li  className=' text-white hover:underline'> Sign in</li>
                    </Link>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
