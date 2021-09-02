import React, {useState} from 'react';
import Tweet from './tweet';
import './App.scss';

function App() {

  const [username, setUsername] = useState("GalatasaraySK");
  const [name, setName] = useState("Galatasaray SK");
  const [avatar, setAvatar] = useState("https://pbs.twimg.com/profile_images/1432448092482285569/2l60VoB8_400x400.jpg");
  const [verified, setVerified] = useState(true);
  const [locked, setLocked] = useState(false);
  const [display, setDisplay] = useState("default");
  const [text, setText] = useState("🦁 Aslanlarımız, Kasımpaşa maçının hazırlıklarını bu akşam yaptığı idmanla tamamladı. ✅ #KSMvGS");
  const [image, setImage] = useState([
    "https://pbs.twimg.com/media/E95HAUEWYAYjsd4?format=jpg&name=medium",
    "https://pbs.twimg.com/media/E95HAUNWUAAQ0NY?format=jpg&name=medium",
    "https://pbs.twimg.com/media/E95HAUQWUBIN8VR?format=jpg&name=medium",
    "https://pbs.twimg.com/media/E95HAUMXsAEwbr9?format=jpg&name=medium"
  ]);
  const [date, setDate] = useState("7:47 PM · Aug 28, 2021");
  const [app, setApp] = useState("Twitter for iPhone");
  const [retweets, setRetweets] = useState(5703);
  const [quotedTweets, setQuotedTweets] = useState(379);
  const [likes, setLikes] = useState(68900);

  const fetchTwitterInfo = () => {
    fetch(
        `https://typeahead-js-twitter-api-proxy.herokuapp.com/demo/search?q=${username}`
    )
        .then(res => res.json())
        .then(data => {
          const twitter = data[0];

          console.log(twitter)

          setName(twitter.name);
          setUsername(twitter.screen_name);
          setText(twitter.status.text);
          setRetweets(twitter.status.retweet_count);
          setLikes(twitter.status.favorite_count);
          setVerified(twitter.verified);
          setAvatar(twitter.profile_image_url);
          setImage([]);
        });
  };


  return (
    <>
      <div className={"container"}>
        <div className="fetch-info">
          <input
              type="text"
              value={username}
              placeholder="Please type twitter username"
              onChange={e => setUsername(e.target.value)}
          />
          <button onClick={fetchTwitterInfo}>Fetch Last Tweet</button>
        </div>

        <Tweet config={
          {
            user: {
              username: username,
              name: name,
              avatar: avatar,
              verified: verified,
              locked: locked
            },
            display: display, // default, dim or lights-out
            text: text,
            image: image,
            date: date,
            app: app,
            retweets: retweets,
            quotedTweets: quotedTweets,
            likes: likes
          }
        }/>
      </div>
      <div className={"tweet-settings"}>
        <ul>
          <li>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username}
                   onChange={e => setUsername(e.target.value)}/>
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
          </li>
          <li>
            <label htmlFor="avatar">Avatar</label>
            <input type="text" id="avatar" value={avatar}
                   onChange={e => setAvatar(e.target.value)}/>
          </li>
          <li>
            <label htmlFor="verified">Verified</label>
            <input type="checkbox" id="verified" checked={verified} onChange={e => {
              const val = e.target.checked;
              setVerified(val);
              if (val && locked) setLocked(false);
            }}/>
          </li>
          <li>
            <label htmlFor="locked">Locked</label>
            <input type="checkbox" id="locked" checked={locked} onChange={e => {
              const val = e.target.checked;
              setLocked(val);
              if (val && verified) setVerified(false);
            }}/>
          </li>
          <li>
            <label htmlFor="display">Display</label>
            <select name="display" id="display" onChange={e => {
              setDisplay(e.target.value)
            }}>
              <option value="default" selected>Default</option>
              <option value="dim">Dim</option>
              <option value="lightsout">Lights out</option>
            </select>
          </li>
          <li>
            <label htmlFor="text">Text</label>
            <textarea id="text" value={text} onChange={e => setText(e.target.value)}
                      maxLength="280"/>
          </li>
          <li>
            <label htmlFor="image">Images</label>
            <textarea id="image" value={image} placeholder="Comma separated"
                      onChange={e => {
                        const value = e.target.value;
                        setImage(value ? value.split(",") : []);
                      }}/><br/>
          </li>
          <li>
            <label htmlFor="date">Date</label>
            <input type="text" id="date" value={date} onChange={e => setDate(e.target.value)}/>
          </li>
          <li>
            <div>
              <label htmlFor="app">App</label>
              <input type="text" id="app" value={app} onChange={e => setApp(e.target.value)}/>
            </div>
          </li>
          <li>
            <label htmlFor="retweets">Retweets</label>
            <input type="number" id="retweets" value={retweets}
                   onChange={e => setRetweets(e.target.value)}/>
          </li>
          <li>
            <label htmlFor="retweetsWithComments">RTs w/ comments</label>
            <input type="number" id="retweetsWithComments" value={quotedTweets}
                   onChange={e => setQuotedTweets(e.target.value)}/>
          </li>
          <li>
            <label htmlFor="likes">Likes</label>
            <input type="number" id="likes" value={likes} onChange={e => setLikes(e.target.value)}/>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
