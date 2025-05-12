import { useState } from "react";
import "./App.css";
import { FaTags } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function App() {
  const [tagvalue, settagvalue] = useState("");
  const [tags, settags] = useState<string[]>([]);
  const [tagscount, settagscount] = useState(10);

  function checkTagAlreadyExists(value: string) {
    let tagpresent = false;
    tags.forEach((t) => {
      if (value.toLowerCase() === t.toLowerCase()) tagpresent = true;
    });

    return tagpresent;
  }

  function handleAddTags(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key == "Enter") {
      let istagpresent = checkTagAlreadyExists(tagvalue);
      if (istagpresent) return;
      if (tagvalue === "" || tagscount < 1) return;
      if (tagvalue.includes(",")) {
        let splittedtags = [...new Set(tagvalue.split(","))]
          .filter((v) => v.trim() != "")
          .filter((t) => !checkTagAlreadyExists(t.trim()));

        let additonaltags = tagscount - splittedtags.length;
        splittedtags.splice(additonaltags);
        settagscount((p) => p - splittedtags.length);
        settags((p) => [...p, ...splittedtags]);
      } else {
        settags((p) => [...p, tagvalue]);

        settagscount((p) => p - 1);
      }
      settagvalue("");
    }
  }

  function handleTagremove(dltind: number) {
    const deletedtags = tags.filter((_, i) => i != dltind);
    settags(deletedtags);
    settagscount((p) => p + 1);
    settagvalue("");
  }

  function handleRemoveAllTags() {
    settags([]);
    settagscount(10);
    settagvalue("");
  }

  return (
    <>
      <div className="tags_container">
        <div className="heading_container center">
          <h1 className="center">
            <FaTags />
          </h1>
          <h1>Tags</h1>
        </div>
        <div className="desc_container">
          <h4>Please Enter or add a comma after each tag</h4>
        </div>
        <div className="tags_input_box">
          {tags.map((tag, index) => {
            return (
              <div className="tags" key={index}>
                <div className="tag center">
                  {tag}
                  <button onClick={() => handleTagremove(index)}>
                    <RxCross2 />
                  </button>
                </div>
              </div>
            );
          })}
          <input
            onKeyDown={handleAddTags}
            value={tagvalue}
            onChange={(e) => settagvalue(e.target.value)}
            type="text"
            placeholder={tagscount == 10 ? "Add a tag..." : ""}
          />
        </div>
        <div className="btn_remaning_container">
          <div className="remaining_text">
            <h4>{tagscount} tags are remaining</h4>
          </div>
          <div className="remove_btn">
            <button onClick={handleRemoveAllTags}>Remove all</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
