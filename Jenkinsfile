pipeline{
    agent any
    stages{
        stage("DataScientest Variables"){
            steps{
                echo "Hello baby1"
                sh "printenv"
                echo "The build id is ${env.BUILD_ID}"
            }

        }
    }
}