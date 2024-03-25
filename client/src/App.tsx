import React,{ useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [inputOption, setInputOption] = useState('');
  const [inputContributor, setInputContributor] = useState('');
  const [repos, setRepos] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [commits, setCommits] = useState([]);
  const [readLater, setReadLater] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCommits = commits.filter((commit:any) =>
    commit.sha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commit.commit.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    commit.commit.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e:any) => {
    setInputValue(e.target.value);
  };

  const handleRepoChange = (e:any) => {
    setInputOption(e.target.value);
  };

  const handleContributorChange = (e:any) => {
    setInputContributor(e.target.value);
  };

  const handleReadLaterChange = (sha:string) =>{
    const index: number = readLater.findIndex(item => item === sha);
    const updatedReadLater = [...readLater]; // Create a copy of readLater array
  
    if (index !== -1) {
      updatedReadLater.splice(index, 1);
    } else {
      updatedReadLater.push(sha);
    }

    setReadLater(updatedReadLater);
  }

  const seeReadLater = () => {
    fetch('http://localhost:3001/api/git/test/update/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ favourites: readLater, user:"KeeanMitchell" }) // You can send additional data if required
    })
      .then(response => {
        if (response.ok) {
          return ;
        }
        throw new Error('Network response was not ok.');
      })
      .then(() =>{
        setCount(count+1);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
      
  };

  const fetchRepos = () => {
    fetch('http://localhost:3001/api/git/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ owner: inputValue }) // You can send additional data if required
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle API response data here
        console.log(data);
        setRepos(data);
        setInputOption(data[0]);
        setCount(count + 1);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const fetchContributors = () => {
    fetch('http://localhost:3001/api/git/contributors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ owner: inputValue, repo: inputOption}) // You can send additional data if required
    })
      .then(response => {
        if (response.ok) {
          listReadLater();
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle API response data here
        console.log(data);
        setContributors(data);
        setInputContributor(data[0]);
        setCount(count + 1);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const listCommits = () => {
    
    fetch('http://localhost:3001/api/git/contributor/commits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ owner: inputValue, repo: inputOption, user: inputContributor}) // You can send additional data if required
    })
      .then(response => {
        if (response.ok) {
          
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle API response data here
        console.log(data);
        setCommits(data);
        setCount(count + 1);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });

  };

  const listReadLater = () =>{
    fetch('http://localhost:3001/api/git/test/fetch/supabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ owner: inputValue, repo: inputOption, user: inputContributor}) // You can send additional data if required
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        // Handle API response data here
        console.log(data);
        setReadLater(data);
      })
      .catch(error => {
        // Handle errors here
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  return (
    <div>
      {count === 0 && 
        <div>
          <h1>Who is the owner of the repo?</h1>
          <input type='text' value={inputValue} onChange={handleChange}/>
          <button disabled={inputValue.trim() === ''} onClick={fetchRepos}>
            Continue
          </button>
        </div>
      }
      {count === 1 && 
        <div>
          <h1>Which Repo would you like to view?</h1>
          <select onChange={handleRepoChange}>
            {repos.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <button onClick={fetchContributors}>
            Continue
          </button>
        </div>
      }
      {count === 2 && 
        <div>
          <h1>Which Contributor would you like to see the commits of?</h1>
          <select onChange={handleContributorChange}>
            {contributors.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
          <button onClick={listCommits}>
            Continue
          </button>
        </div>
      }
      {count === 3 && 
        <div>
          <h1>Commit Information</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <table>
            <thead>
              <tr>
                <th>SHA</th>
                <th>Author</th>
                <th>Message</th>
                <th>Commit URL</th>
                <th>Read Later</th>
              </tr>
            </thead>
            <tbody>
            {filteredCommits.map((commit:any, index) => (
              <tr key={index}>
                <td>{commit.sha}</td>
                <td>{commit.commit.author.name}</td>
                <td>{commit.commit.message}</td>
                <td>
                  <a href={commit.html_url} target="_blank" rel="noopener noreferrer">
                    View Commit
                  </a>
                </td>
                <td>
                  <input type="checkbox" checked={readLater.includes(commit.sha)} onChange={() => handleReadLaterChange(commit.sha)}/>
                </td>
              </tr>
            ))
            }
            {/* {commits.map((commit: any, index) => (
              <tr key={index}>
                <td>{commit.sha}</td>
                <td>{commit.commit.author.name}</td>
                <td>{commit.commit.message}</td>
                <td><a href={commit.html_url} target="_blank" rel="noopener noreferrer">View Commit</a></td>
                <td>
                  <input type="checkbox" checked={readLater.includes(commit.sha)} onChange={() => handleReadLaterChange(commit.sha)}/>
                </td>
              </tr>
            ))} */}
            </tbody>
          </table>
          <button onClick={seeReadLater}>
            Go to Read Later
          </button>
        </div>
      }
      {count === 4 && 
        <div>
        <h1>Read Later Information</h1>
        <table>
          <thead>
            <tr>
              <th>SHA</th>
              <th>Author</th>
              <th>Message</th>
              <th>Commit URL</th>
            </tr>
          </thead>
          <tbody>
          {commits.map((commit: any, index) => (
            readLater.includes(commit.sha) &&
            <tr key={index}>
              <td>{commit.sha}</td>
              <td>{commit.commit.author.name}</td>
              <td>{commit.commit.message}</td>
              <td><a href={commit.html_url} target="_blank" rel="noopener noreferrer">View Commit</a></td>
            </tr>
          ))}
          </tbody>
        </table>
        <button onClick={() =>setCount(count-1)}>
          Back to All Commits
        </button>
      </div>
      }
    </div>
  );
}


export default App;
