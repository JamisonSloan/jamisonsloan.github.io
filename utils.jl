function hfun_bar(vname)
  val = Meta.parse(vname[1])
  return round(sqrt(val), digits=2)
end

function hfun_m1fill(vname)
  var = vname[1]
  return pagevar("index", var)
end

function lx_baz(com, _)
  # keep this first line
  brace_content = Franklin.content(com.braces[1]) # input string
  # do whatever you want here
  return uppercase(brace_content)
end

using Dates

"""
    {{meta}}

Plug in specific meta information for a blog page. The `meta` local page
variable should be given as a list of tuples of pairs like so:
```
@def meta = [("property"=>"og:video", "content"=>"http://example.com/"),
             ("propery"=>"og:title", "content"=>"The Rock")]
```
"""
function hfun_meta()
    m = locvar(:meta)
    io = IOBuffer()
    for tuple in locvar(:meta)
        write(io, "<meta ")
        for (prop, val) in tuple
            write(io, "$prop=\"$val\" ")
        end
        write(io, ">")
    end
    return String(take!(io))
end


"""
    {{navigation}}

Plugs in the list of blog posts contained in the `/blog/` folder.
"""
function hfun_navigation()
    rootDir = "."  # Root directory
    
    # Get all files and folders in the root directory
    items = readdir(rootDir)
    
    # Filter folders and Markdown files
    folders = filter(item -> isdir(joinpath(rootDir, item)) && !startswith(item, "_") && !startswith(item, "."), items)
    markdownFiles = filter(file -> endswith(file, ".md"), items)
    
    io = IOBuffer()
    
    # Generate navigation HTML for folders
    for folder in folders
        folderUrl = "/$folder/"
        folderName = string(uppercase(folder[1]), lowercase(folder[2:end]))
        
        # Generate sub-navigation HTML for Markdown files within the folder
        folderPath = joinpath(rootDir, folder)
        folderFiles = filter(file -> endswith(file, ".md"), readdir(folderPath))
        
        for file in folderFiles
            fileUrl = "/$folder/$(chop(file, tail=3))"
            fileName = string(uppercase(file[1]), lowercase(file[2:end-3]))
            
            title = pagevar(joinpath(folderPath, file), :title)
            id = replace(lowercase(title), r"\s+" => "-")
            draft = locvar(:draft)
            
            if !isnothing(title) && isnothing(draft) && draft != true
                write(io, """
                    <a class="sub-navigation" href="$fileUrl" id="$id"><span>$title</span></a>
                """)
            end
        end
    end

    return String(take!(io))
end
